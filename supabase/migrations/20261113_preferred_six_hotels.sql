begin;
create or replace function public.wejha_import_preferred(p_agency uuid,p_rows jsonb,p_commit boolean default false,p_revision text default null)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare actor uuid:=auth.uid(); role_name text; rev text; g record; r record; old_id uuid; old_country text; num int; n_added int:=0; n_updated int:=0; n_archived int:=0; summary jsonb:='[]'::jsonb;
begin
 select role into role_name from public.agency_members where agency_id=p_agency and user_id=actor;
 if actor is null or role_name is null or role_name not in ('owner','agent') then raise exception 'not_authorized';end if;
 if jsonb_typeof(p_rows)<>'array' or jsonb_array_length(p_rows)<1 or jsonb_array_length(p_rows)>2000 then raise exception 'invalid_row_count';end if;
 if exists(select 1 from jsonb_array_elements(p_rows) j where coalesce(length(btrim(j->>'country')),0) not between 1 and 100 or coalesce(length(btrim(j->>'city')),0) not between 1 and 150 or coalesce(length(btrim(j->>'hotel')),0) not between 1 and 250 or coalesce(j->>'stars','') not in ('4','5') or coalesce(j->>'priority','') not in ('1','2','3','4','5','6') or length(coalesce(j->>'notes',''))>1000) then raise exception 'invalid_hotel_row';end if;
 if exists(select 1 from jsonb_to_recordset(p_rows) as x(country text,city text,hotel text) group by lower(btrim(city)),lower(btrim(hotel)) having count(*)>1) then raise exception 'duplicate_hotel';end if;
 if exists(select 1 from jsonb_to_recordset(p_rows) as x(country text,city text,hotel text) group by lower(btrim(city)) having count(distinct lower(btrim(country)))>1) then raise exception 'city_has_multiple_countries';end if;
 if exists(select 1 from jsonb_to_recordset(p_rows) as x(country text,city text,stars int,priority int) group by lower(btrim(country)),lower(btrim(city)) having count(*)<>6 or count(*) filter(where stars=4)<>2 or count(*) filter(where stars=5)<>4 or count(distinct priority)<>6) then raise exception 'each_city_requires_six_hotels_two_four_star_four_five_star';end if;
 perform pg_advisory_xact_lock(hashtextextended('wejha-preferred:'||p_agency::text,0));
 select md5(coalesce(string_agg(id::text||updated_at::text||active::text,'|' order by id),'')) into rev from public.preferred_hotels where agency_id=p_agency;
 if p_commit and (p_revision is null or p_revision<>rev) then raise exception 'preferred_list_changed_refresh_preview';end if;
 for g in select min(country) as country,min(city) as city,lower(btrim(country)) as ck,lower(btrim(city)) as k from jsonb_to_recordset(p_rows) as x(country text,city text) group by lower(btrim(country)),lower(btrim(city))
 loop
  if exists(select 1 from public.preferred_hotels h where h.agency_id=p_agency and lower(btrim(h.city))=g.k and h.country is not null and lower(btrim(h.country))<>g.ck) then raise exception 'city_country_conflict: %',g.city;end if;
  select count(*) into num from public.preferred_hotels h where h.agency_id=p_agency and lower(btrim(h.city))=g.k and h.active and not exists(select 1 from jsonb_to_recordset(p_rows) as x(city text,hotel text) where lower(btrim(x.city))=g.k and lower(btrim(x.hotel))=lower(btrim(h.hotel)));
  n_archived:=n_archived+num;
  summary:=summary||jsonb_build_array(jsonb_build_object('country',g.country,'city',g.city,'hotels',6,'four_star',2,'five_star',4,'archived',num));
  if p_commit then update public.preferred_hotels h set active=false where h.agency_id=p_agency and lower(btrim(h.city))=g.k and h.active and not exists(select 1 from jsonb_to_recordset(p_rows) as x(city text,hotel text) where lower(btrim(x.city))=g.k and lower(btrim(x.hotel))=lower(btrim(h.hotel)));end if;
 end loop;
 for r in select * from jsonb_to_recordset(p_rows) as x(country text,city text,hotel text,priority int,stars int,notes text)
 loop
  old_id:=null;
  select id into old_id from public.preferred_hotels where agency_id=p_agency and lower(btrim(city))=lower(btrim(r.city)) and lower(btrim(hotel))=lower(btrim(r.hotel));
  if old_id is null then
   n_added:=n_added+1;
   if p_commit then insert into public.preferred_hotels(agency_id,country,city,hotel,priority,stars,notes,active) values(p_agency,btrim(r.country),btrim(r.city),btrim(r.hotel),r.priority,r.stars,nullif(btrim(r.notes),''),true);end if;
  else
   n_updated:=n_updated+1;
   if p_commit then update public.preferred_hotels set country=btrim(r.country),city=btrim(r.city),hotel=btrim(r.hotel),priority=r.priority,stars=r.stars,notes=nullif(btrim(r.notes),''),active=true where id=old_id and agency_id=p_agency;end if;
  end if;
 end loop;
 return jsonb_build_object('committed',p_commit,'revision',rev,'cities',summary,'hotels',jsonb_array_length(p_rows),'added',n_added,'updated',n_updated,'archived',n_archived);
end $$;
revoke all on function public.wejha_import_preferred(uuid,jsonb,boolean,text) from public,anon;
grant execute on function public.wejha_import_preferred(uuid,jsonb,boolean,text) to authenticated;
commit;
