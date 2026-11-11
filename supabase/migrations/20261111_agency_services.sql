-- Services each agency sells around the hotel: transfers, meet & assist, car with driver, activities.
-- The WhatsApp agent combines them with hotels to build a full package.
create table if not exists public.agency_services (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  city text not null,                       -- English city name, e.g. Istanbul
  country_code text,                        -- ISO-2, e.g. TR
  kind text not null check (kind in ('transfer_oneway','transfer_roundtrip','meet_assist','car_driver_day','intercity_transfer','activity','other')),
  name text not null,                       -- what the customer sees, e.g. "Airport → hotel, private car"
  vehicle text,                             -- sedan / van / minibus / bus / none
  max_pax int,                              -- seats per vehicle (per_vehicle prices)
  price numeric(12,2) not null check (price >= 0),
  price_basis text not null default 'per_vehicle' check (price_basis in ('per_vehicle','per_person','per_day','per_group')),
  child_price numeric(12,2),                -- per_person only; null = same as adult
  currency text not null default 'SAR',
  margin_type text not null default 'percent' check (margin_type in ('percent','fixed')),
  margin_value numeric(12,2) not null default 0,
  to_city text,                             -- intercity transfers only
  hours numeric(5,1),                       -- car with driver: hours per day
  auto_include boolean not null default false, -- add automatically to every package in this city (e.g. airport transfers)
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists agency_services_city on public.agency_services (agency_id, lower(city));
alter table public.agency_services enable row level security;
drop policy if exists agency_services_read on public.agency_services;
create policy agency_services_read on public.agency_services for select to authenticated
  using (agency_id = public.my_agency());
drop policy if exists agency_services_write on public.agency_services;
create policy agency_services_write on public.agency_services for all to authenticated
  using (agency_id = public.my_agency() and public.my_role() in ('owner','agent'))
  with check (agency_id = public.my_agency() and public.my_role() in ('owner','agent'));
create or replace function public.agency_services_touch() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists agency_services_touch on public.agency_services;
create trigger agency_services_touch before update on public.agency_services
  for each row execute function public.agency_services_touch();
