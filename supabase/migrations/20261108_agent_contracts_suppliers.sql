-- Wejha: AI agent, supplier accounts, package contracts, package requests
-- Safe to re-run (idempotent). Does not modify existing tables.

create extension if not exists pgcrypto;

-- 1) WhatsApp business numbers that the AI agent answers on, per agency
create table if not exists public.agency_channels (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  wa_phone_number_id text not null unique,      -- Meta phone_number_id
  display_phone text,
  label text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.agency_channels enable row level security;
drop policy if exists agency_channels_read on public.agency_channels;
create policy agency_channels_read on public.agency_channels for select to authenticated
  using (agency_id = public.my_agency());

-- 2) Supplier accounts (LuxeCheck, other wholesalers). Password lives in a separate, locked table.
create table if not exists public.supplier_accounts (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  supplier text not null,                        -- free name, e.g. LuxeCheck
  access_type text not null default 'browser' check (access_type in ('browser','api')),
  login_url text,
  username text,
  active boolean not null default true,
  has_secret boolean not null default false,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
alter table public.supplier_accounts enable row level security;
drop policy if exists supplier_accounts_read on public.supplier_accounts;
create policy supplier_accounts_read on public.supplier_accounts for select to authenticated
  using (agency_id = public.my_agency());

create table if not exists public.supplier_secrets (
  account_id uuid primary key references public.supplier_accounts(id) on delete cascade,
  secret_enc bytea not null,
  updated_at timestamptz not null default now()
);
alter table public.supplier_secrets enable row level security;   -- no policies: nobody but service role / definer functions
revoke all on public.supplier_secrets from anon, authenticated;

-- encryption key generated inside the DB and kept in Supabase Vault (never shown)
do $$
begin
  if not exists (select 1 from vault.secrets where name = 'wejha_supplier_key') then
    perform vault.create_secret(encode(gen_random_bytes(32),'hex'), 'wejha_supplier_key', 'Encrypts supplier passwords');
  end if;
end $$;

create or replace function public._supplier_key() returns text
language sql security definer set search_path = public, vault as $$
  select decrypted_secret from vault.decrypted_secrets where name = 'wejha_supplier_key' limit 1
$$;
revoke all on function public._supplier_key() from public, anon, authenticated;

-- owner saves/updates an account (password optional on update)
create or replace function public.save_supplier_account(
  p_id uuid, p_supplier text, p_access_type text, p_login_url text, p_username text, p_password text, p_active boolean default true)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_agency uuid := public.my_agency(); v_id uuid;
begin
  perform public.require_role(array['owner']);
  if coalesce(trim(p_supplier),'') = '' then raise exception 'supplier_required'; end if;
  if p_id is null then
    insert into public.supplier_accounts(agency_id,supplier,access_type,login_url,username,active)
    values (v_agency,trim(p_supplier),coalesce(p_access_type,'browser'),p_login_url,p_username,coalesce(p_active,true))
    returning id into v_id;
  else
    update public.supplier_accounts set supplier=trim(p_supplier), access_type=coalesce(p_access_type,access_type),
      login_url=p_login_url, username=p_username, active=coalesce(p_active,active), updated_at=now()
    where id=p_id and agency_id=v_agency returning id into v_id;
    if v_id is null then raise exception 'not_found'; end if;
  end if;
  if coalesce(p_password,'') <> '' then
    insert into public.supplier_secrets(account_id,secret_enc,updated_at)
    values (v_id, pgp_sym_encrypt(p_password, public._supplier_key()), now())
    on conflict (account_id) do update set secret_enc=excluded.secret_enc, updated_at=now();
    update public.supplier_accounts set has_secret=true, updated_at=now() where id=v_id;
  end if;
  return v_id;
end $$;

create or replace function public.delete_supplier_account(p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public.require_role(array['owner']);
  delete from public.supplier_accounts where id=p_id and agency_id=public.my_agency();
end $$;

-- AI agent only (service role): agency config + decrypted supplier credentials for one WhatsApp number
create or replace function public.agent_context(p_phone_number_id text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_agency uuid; v jsonb;
begin
  if coalesce(auth.role(),'') <> 'service_role' then raise exception 'forbidden'; end if;
  select agency_id into v_agency from public.agency_channels where wa_phone_number_id=p_phone_number_id and active;
  if v_agency is null then return null; end if;
  select jsonb_build_object(
    'agency_id', a.id, 'name', a.name, 'brand', a.brand,
    'suppliers', coalesce((select jsonb_agg(jsonb_build_object(
        'id', s.id, 'supplier', s.supplier, 'access_type', s.access_type, 'login_url', s.login_url,
        'username', s.username, 'password', pgp_sym_decrypt(x.secret_enc, public._supplier_key())))
      from public.supplier_accounts s join public.supplier_secrets x on x.account_id=s.id
      where s.agency_id=a.id and s.active), '[]'::jsonb)
  ) into v from public.agencies a where a.id=v_agency;
  return v;
end $$;
revoke all on function public.agent_context(text) from public, anon, authenticated;

-- 3) Package contracts (Maldives resort contracts, full tour programs)
create table if not exists public.package_contracts (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft','approved','stopped','archived')),
  kind text not null check (kind in ('resort','fixed_program')),
  destination text not null,
  title text not null,
  valid_from date, valid_to date, book_by date,
  currency text not null default 'USD',
  margin_type text not null default 'percent' check (margin_type in ('percent','fixed')),
  margin_value numeric not null default 0,
  data jsonb not null default '{}'::jsonb,
  source_file text,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists package_contracts_lookup on public.package_contracts(agency_id,status,destination);
alter table public.package_contracts enable row level security;
drop policy if exists package_contracts_read on public.package_contracts;
create policy package_contracts_read on public.package_contracts for select to authenticated
  using (agency_id = public.my_agency());
drop policy if exists package_contracts_write on public.package_contracts;
create policy package_contracts_write on public.package_contracts for all to authenticated
  using (agency_id = public.my_agency() and public.my_role() in ('owner','agent'))
  with check (agency_id = public.my_agency() and public.my_role() in ('owner','agent'));

-- 4) Package booking requests created by the agent, handled by agency staff
create table if not exists public.package_requests (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  contract_id uuid references public.package_contracts(id) on delete set null,
  ref text,
  customer_phone text,
  guests jsonb not null default '[]'::jsonb,
  flights text,
  quote jsonb not null default '{}'::jsonb,
  total numeric, currency text,
  status text not null default 'new' check (status in ('new','confirmed','payment_sent','paid','cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists package_requests_agency on public.package_requests(agency_id,status,created_at desc);
alter table public.package_requests enable row level security;
drop policy if exists package_requests_read on public.package_requests;
create policy package_requests_read on public.package_requests for select to authenticated
  using (agency_id = public.my_agency());
drop policy if exists package_requests_update on public.package_requests;
create policy package_requests_update on public.package_requests for update to authenticated
  using (agency_id = public.my_agency()) with check (agency_id = public.my_agency());

-- 5) private storage bucket for uploaded contract files (path: <agency_id>/<file>)
insert into storage.buckets (id, name, public) values ('contracts','contracts',false)
on conflict (id) do nothing;
drop policy if exists contracts_files_rw on storage.objects;
create policy contracts_files_rw on storage.objects for all to authenticated
  using (bucket_id='contracts' and (storage.foldername(name))[1] = public.my_agency()::text)
  with check (bucket_id='contracts' and (storage.foldername(name))[1] = public.my_agency()::text);
