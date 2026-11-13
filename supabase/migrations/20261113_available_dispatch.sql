begin;
create table if not exists public.ops_staff_presence (
 agency_id uuid not null references public.agencies(id) on delete cascade,
 staff_id uuid not null references auth.users(id) on delete cascade,
 state text not null default 'offline' check(state in ('available','break','offline')),
 enabled boolean not null default true,
 last_seen timestamptz not null default '-infinity',
 last_assigned_at timestamptz,
 updated_at timestamptz not null default now(),
 primary key(agency_id,staff_id)
);
alter table public.ops_staff_presence enable row level security;
create policy presence_agency_read on public.ops_staff_presence for select to authenticated using(agency_id=public.my_agency());
grant select on public.ops_staff_presence to authenticated;
create table if not exists public.ops_dispatch_queue (
 agency_id uuid not null references public.agencies(id) on delete cascade,
 request_id text not null check(length(request_id) between 1 and 140 and request_id not like '\_\_%'),
 status text not null,
 order_updated_at timestamptz not null,
 primary key(agency_id,request_id)
);
alter table public.ops_dispatch_queue enable row level security;
create policy dispatch_queue_agency_read on public.ops_dispatch_queue for select to authenticated using(agency_id=public.my_agency());
grant select on public.ops_dispatch_queue to authenticated;

create or replace function public.wejha_set_presence(p_agency uuid,p_state text default null,p_staff uuid default null,p_enabled boolean default null)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare actor uuid:=auth.uid(); target uuid:=coalesce(p_staff,auth.uid()); actor_role text; result jsonb;
begin
 select role into actor_role from public.agency_members where agency_id=p_agency and user_id=actor;
 if actor is null or actor_role is null or actor_role not in ('owner','agent') then raise exception 'not_authorized'; end if;
 if (target<>actor or p_enabled is not null) and actor_role<>'owner' then raise exception 'owner_required'; end if;
 if not exists(select 1 from public.agency_members where agency_id=p_agency and user_id=target and role in ('owner','agent')) then raise exception 'staff_not_eligible'; end if;
 if p_state is not null and p_state not in ('available','break','offline') then raise exception 'invalid_presence'; end if;
 if target<>actor and p_state is not null and p_state<>'offline' then raise exception 'staff_must_set_own_availability'; end if;
 perform pg_advisory_xact_lock(hashtextextended('wejha-dispatch:'||p_agency::text,0));
 insert into public.ops_staff_presence(agency_id,staff_id,state,enabled,last_seen)
 values(p_agency,target,coalesce(p_state,'offline'),coalesce(p_enabled,true),case when target=actor then now() else '-infinity'::timestamptz end)
 on conflict(agency_id,staff_id) do update set
 state=case when p_enabled=false then 'offline' else coalesce(p_state,ops_staff_presence.state) end,
 enabled=coalesce(p_enabled,ops_staff_presence.enabled),
 last_seen=case when target=actor then now() else ops_staff_presence.last_seen end,
 updated_at=now();
 select to_jsonb(p) into result from public.ops_staff_presence p where agency_id=p_agency and staff_id=target;
 return result;
end $$;

create or replace function public.wejha_dispatch(p_agency uuid,p_orders jsonb default '[]'::jsonb)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare actor uuid:=auth.uid(); actor_role text; item record; existing public.ops_assignments%rowtype; chosen uuid; previous text; reason text; eligible boolean; count_assigned int:=0; changed_at timestamptz:=now(); assignments jsonb; presence jsonb;
begin
 select role into actor_role from public.agency_members where agency_id=p_agency and user_id=actor;
 if actor is null or actor_role is null then raise exception 'not_authorized'; end if;
 if jsonb_typeof(p_orders)<>'array' or jsonb_array_length(p_orders)>1000 then raise exception 'invalid_orders'; end if;
 perform pg_advisory_xact_lock(hashtextextended('wejha-dispatch:'||p_agency::text,0));
 if actor_role in ('owner','agent') then
  for item in select distinct on (j->>'request_id') j->>'request_id' as id,j->>'status' as status,(j->>'updated_at')::timestamptz as updated_at from jsonb_array_elements(p_orders) j
   where length(j->>'request_id') between 1 and 140 and (j->>'request_id') not like '\_\_%' and j->>'status' in ('received','searching','quoted','payment_pending','paid','vouchered','hold','human_review','failed','cancelled','processing','replied') order by j->>'request_id',(j->>'updated_at')::timestamptz desc
  loop
   if item.updated_at>now()+interval '5 minutes' or item.updated_at<now()-interval '3 days' then continue; end if;
   if exists(select 1 from public.ops_assignments a where a.request_id=item.id and a.agency_id<>p_agency) then raise exception 'request_agency_mismatch'; end if;
   insert into public.ops_dispatch_queue(agency_id,request_id,status,order_updated_at) values(p_agency,item.id,item.status,item.updated_at)
   on conflict(agency_id,request_id) do update set status=excluded.status,order_updated_at=excluded.order_updated_at where excluded.order_updated_at>=ops_dispatch_queue.order_updated_at;
  end loop;
  for item in select q.* from public.ops_dispatch_queue q where q.agency_id=p_agency and q.status not in ('paid','vouchered','cancelled') and q.order_updated_at>now()-interval '3 days' order by q.order_updated_at,q.request_id
  loop
   select * into existing from public.ops_assignments a where a.request_id=item.request_id and a.agency_id=p_agency for update;
   if existing.accepted_at is not null then continue; end if;
   previous:=existing.staff_id;
   select exists(select 1 from public.ops_staff_presence p join public.agency_members m on m.agency_id=p.agency_id and m.user_id=p.staff_id where p.agency_id=p_agency and p.staff_id::text=previous and p.enabled and p.state='available' and p.last_seen>now()-interval '3 minutes' and m.role in ('owner','agent')) into eligible;
   if previous is not null and eligible and existing.assigned_at>now()-interval '10 minutes' then continue; end if;
   chosen:=null;
   select p.staff_id into chosen from public.ops_staff_presence p join public.agency_members m on m.agency_id=p.agency_id and m.user_id=p.staff_id
   where p.agency_id=p_agency and p.enabled and p.state='available' and p.last_seen>now()-interval '3 minutes' and m.role in ('owner','agent') and (previous is null or p.staff_id::text<>previous)
   order by (select count(*) from public.ops_assignments a join public.ops_dispatch_queue q on q.agency_id=a.agency_id and q.request_id=a.request_id where a.agency_id=p_agency and a.staff_id=p.staff_id::text and q.status not in ('paid','vouchered','cancelled') and q.order_updated_at>now()-interval '3 days'), p.last_assigned_at nulls first,p.staff_id limit 1;
   if chosen is null and eligible then continue; end if;
   if chosen is null and previous is null then continue; end if;
   reason:=case when chosen is null then 'waiting_available' when previous is null then 'auto' when not eligible then 'unavailable' else 'timeout' end;
   insert into public.ops_assignments(request_id,agency_id,staff_id,assigned_at,accepted_at,history,updated_at)
   values(item.request_id,p_agency,chosen::text,case when chosen is null then null else changed_at end,null,
    jsonb_build_object('log',coalesce(existing.history->'log','[]'::jsonb)||jsonb_build_array(jsonb_build_object('s',chosen::text,'at',changed_at,'by',reason))),changed_at)
   on conflict(request_id) do update set staff_id=excluded.staff_id,assigned_at=excluded.assigned_at,history=excluded.history,updated_at=excluded.updated_at where ops_assignments.agency_id=p_agency and ops_assignments.accepted_at is null;
   if chosen is not null then update public.ops_staff_presence set last_assigned_at=changed_at where agency_id=p_agency and staff_id=chosen;count_assigned:=count_assigned+1;end if;
  end loop;
 end if;
 select coalesce(jsonb_agg(to_jsonb(a)),'[]'::jsonb) into assignments from public.ops_assignments a where a.agency_id=p_agency;
 select coalesce(jsonb_agg(to_jsonb(p)),'[]'::jsonb) into presence from public.ops_staff_presence p where p.agency_id=p_agency;
 return jsonb_build_object('assignments',assignments,'presence',presence,'assigned_count',count_assigned,'server_time',now());
end $$;
revoke all on function public.wejha_set_presence(uuid,text,uuid,boolean) from public,anon;
revoke all on function public.wejha_dispatch(uuid,jsonb) from public,anon;
grant execute on function public.wejha_set_presence(uuid,text,uuid,boolean) to authenticated;
grant execute on function public.wejha_dispatch(uuid,jsonb) to authenticated;
commit;
