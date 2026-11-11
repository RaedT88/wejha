-- Partner portal: hotels / DMCs that load their own contracts into an agency's Wejha.
-- Partners are NOT agency members (my_agency() is null for them), so every existing agency policy keeps them out.
-- They reach their own data only through the partner_* security-definer functions below, which never return the margin.

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  name text not null,
  contact_name text,
  phone text,
  email text,
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.partner_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  partner_id uuid not null references public.partners(id) on delete cascade,
  email text, name text,
  created_at timestamptz not null default now()
);
create table if not exists public.partner_invites (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  unique (partner_id, email)
);

alter table public.package_contracts add column if not exists partner_id uuid references public.partners(id) on delete set null;
alter table public.package_contracts drop constraint if exists package_contracts_status_check;
alter table public.package_contracts add constraint package_contracts_status_check check (status in ('draft','pending','approved','stopped','archived'));

alter table public.package_requests add column if not exists partner_id uuid references public.partners(id) on delete set null;
alter table public.package_requests add column if not exists partner_status text check (partner_status in ('awaiting','confirmed','rejected'));
alter table public.package_requests add column if not exists partner_conf_no text;
alter table public.package_requests add column if not exists partner_note text;
alter table public.package_requests add column if not exists partner_responded_at timestamptz;
alter table public.package_requests add column if not exists net_total numeric;

alter table public.partners enable row level security;
alter table public.partner_members enable row level security;
alter table public.partner_invites enable row level security;

drop policy if exists partners_read on public.partners;
create policy partners_read on public.partners for select using (agency_id = public.my_agency());
drop policy if exists partners_write on public.partners;
create policy partners_write on public.partners for all
  using (agency_id = public.my_agency() and public.my_role() in ('owner','agent'))
  with check (agency_id = public.my_agency() and public.my_role() in ('owner','agent'));
drop policy if exists partner_members_read on public.partner_members;
create policy partner_members_read on public.partner_members for select
  using (exists (select 1 from public.partners p where p.id = partner_id and p.agency_id = public.my_agency()));
drop policy if exists partner_invites_read on public.partner_invites;
create policy partner_invites_read on public.partner_invites for select
  using (exists (select 1 from public.partners p where p.id = partner_id and p.agency_id = public.my_agency()));

grant select, insert, update, delete on public.partners to authenticated;
grant select on public.partner_members, public.partner_invites to authenticated;
grant all on public.partners, public.partner_members, public.partner_invites to service_role;

-- ---------- owner side ----------
create or replace function public.invite_partner_user(p_partner uuid, p_email text)
returns void language plpgsql security definer set search_path = public as $$
declare a uuid := public.require_role(array['owner','agent']);
begin
  if not exists (select 1 from public.partners where id = p_partner and agency_id = a) then raise exception 'not_found'; end if;
  if position('@' in coalesce(p_email,'')) = 0 then raise exception 'bad_email'; end if;
  insert into public.partner_invites(partner_id, email) values (p_partner, lower(trim(p_email))) on conflict do nothing;
end $$;

create or replace function public.remove_partner_user(p_partner uuid, p_email text)
returns void language plpgsql security definer set search_path = public as $$
declare a uuid := public.require_role(array['owner','agent']);
begin
  if not exists (select 1 from public.partners where id = p_partner and agency_id = a) then raise exception 'not_found'; end if;
  delete from public.partner_invites where partner_id = p_partner and lower(email) = lower(trim(p_email));
  delete from public.partner_members where partner_id = p_partner and lower(email) = lower(trim(p_email));
end $$;

-- ---------- partner side ----------
create or replace function public.my_partner() returns uuid language sql stable security definer set search_path = public as $$
  select m.partner_id from public.partner_members m join public.partners p on p.id = m.partner_id
  where m.user_id = auth.uid() and p.active limit 1
$$;

-- Called after sign-in: claims an invite for this e-mail, returns who the partner is (or null).
create or replace function public.partner_me(p_name text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare em text; inv record; pid uuid;
begin
  if auth.uid() is null then return null; end if;
  if exists (select 1 from public.agency_members where user_id = auth.uid()) then return null; end if;
  pid := public.my_partner();
  if pid is null then
    select lower(email) into em from auth.users where id = auth.uid();
    select * into inv from public.partner_invites where lower(email) = em order by created_at limit 1;
    if inv.id is null then return null; end if;
    insert into public.partner_members(user_id, partner_id, email, name) values (auth.uid(), inv.partner_id, em, p_name)
      on conflict (user_id) do update set partner_id = excluded.partner_id;
    delete from public.partner_invites where lower(email) = em;
    pid := inv.partner_id;
  end if;
  return (select jsonb_build_object('partner_id', p.id, 'partner', p.name, 'agency', a.name,
                 'brand', a.brand, 'email', (select email from auth.users where id = auth.uid()))
          from public.partners p join public.agencies a on a.id = p.agency_id where p.id = pid);
end $$;

create or replace function public.partner_contracts()
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', c.id, 'status', c.status, 'kind', c.kind, 'destination', c.destination,
           'title', c.title, 'valid_from', c.valid_from, 'valid_to', c.valid_to, 'book_by', c.book_by, 'currency', c.currency,
           'data', c.data, 'updated_at', c.updated_at) order by c.updated_at desc), '[]'::jsonb)
  from public.package_contracts c where c.partner_id = public.my_partner() and c.status <> 'archived'
$$;

-- New contract or price change: always goes back to 'pending' for the agency to review and set its margin.
create or replace function public.partner_save_contract(p_id uuid, p_title text, p_destination text, p_kind text, p_currency text,
  p_valid_from date, p_valid_to date, p_book_by date, p_data jsonb, p_source_file text default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare pid uuid := public.my_partner(); ag uuid; cid uuid;
begin
  if pid is null then raise exception 'not_partner'; end if;
  select agency_id into ag from public.partners where id = pid;
  if p_kind not in ('resort','fixed_program') then raise exception 'bad_kind'; end if;
  if p_id is null then
    insert into public.package_contracts(agency_id, partner_id, status, kind, destination, title, valid_from, valid_to, book_by, currency,
      margin_type, margin_value, data, source_file, created_by)
    values (ag, pid, 'pending', p_kind, coalesce(p_destination,''), coalesce(nullif(p_title,''),'Contract'), p_valid_from, p_valid_to, p_book_by,
      upper(coalesce(p_currency,'USD')), 'percent', 0, coalesce(p_data,'{}'::jsonb), p_source_file, auth.uid())
    returning id into cid;
  else
    update public.package_contracts set status = 'pending', kind = p_kind, destination = coalesce(p_destination,''),
      title = coalesce(nullif(p_title,''),title), valid_from = p_valid_from, valid_to = p_valid_to, book_by = p_book_by,
      currency = upper(coalesce(p_currency,currency)), data = coalesce(p_data,data), updated_at = now()
    where id = p_id and partner_id = pid and status <> 'archived' returning id into cid;
    if cid is null then raise exception 'not_found'; end if;
  end if;
  return cid;
end $$;

-- Stop-sale / closed dates: applied at once, no review needed.
create or replace function public.partner_set_stop_sales(p_id uuid, p_stop_sales jsonb)
returns void language plpgsql security definer set search_path = public as $$
declare pid uuid := public.my_partner();
begin
  if pid is null then raise exception 'not_partner'; end if;
  if jsonb_typeof(coalesce(p_stop_sales,'[]'::jsonb)) <> 'array' then raise exception 'bad_data'; end if;
  update public.package_contracts set data = jsonb_set(coalesce(data,'{}'::jsonb), '{stop_sales}', coalesce(p_stop_sales,'[]'::jsonb)), updated_at = now()
  where id = p_id and partner_id = pid and status <> 'archived';
  if not found then raise exception 'not_found'; end if;
end $$;

create or replace function public.partner_requests()
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', r.id, 'ref', r.ref, 'created_at', r.created_at, 'contract', c.title,
           'guests', r.guests, 'flights', r.flights, 'checkin', r.quote->>'checkin', 'checkout', r.quote->>'checkout',
           'option', coalesce(r.quote->>'label', r.quote->>'hotel'), 'rooms', r.quote->>'rooms', 'adults', r.quote->'adults', 'children', r.quote->'children',
           'net_total', r.net_total, 'currency', coalesce(c.currency, r.currency), 'status', r.status,
           'partner_status', r.partner_status, 'partner_conf_no', r.partner_conf_no, 'partner_note', r.partner_note) order by r.created_at desc), '[]'::jsonb)
  from public.package_requests r left join public.package_contracts c on c.id = r.contract_id
  where r.partner_id = public.my_partner()
$$;

create or replace function public.partner_respond(p_id uuid, p_confirm boolean, p_conf_no text, p_note text)
returns void language plpgsql security definer set search_path = public as $$
declare pid uuid := public.my_partner();
begin
  if pid is null then raise exception 'not_partner'; end if;
  if p_confirm and coalesce(trim(p_conf_no),'') = '' then raise exception 'conf_no_required'; end if;
  update public.package_requests set partner_status = case when p_confirm then 'confirmed' else 'rejected' end,
    partner_conf_no = nullif(trim(coalesce(p_conf_no,'')),''), partner_note = nullif(trim(coalesce(p_note,'')),''),
    partner_responded_at = now(), updated_at = now()
  where id = p_id and partner_id = pid;
  if not found then raise exception 'not_found'; end if;
end $$;

revoke all on function public.partner_me(text), public.partner_contracts(), public.partner_save_contract(uuid,text,text,text,text,date,date,date,jsonb,text),
  public.partner_set_stop_sales(uuid,jsonb), public.partner_requests(), public.partner_respond(uuid,boolean,text,text),
  public.invite_partner_user(uuid,text), public.remove_partner_user(uuid,text), public.my_partner() from public, anon;
grant execute on function public.partner_me(text), public.partner_contracts(), public.partner_save_contract(uuid,text,text,text,text,date,date,date,jsonb,text),
  public.partner_set_stop_sales(uuid,jsonb), public.partner_requests(), public.partner_respond(uuid,boolean,text,text),
  public.invite_partner_user(uuid,text), public.remove_partner_user(uuid,text), public.my_partner() to authenticated;

notify pgrst, 'reload schema';
