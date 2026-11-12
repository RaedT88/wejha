-- Wejha: Preferred hotels per country/city, ranked 1 (first) to 10.
-- The WhatsApp agent shows these hotels first when a customer searches a city.
create table if not exists public.preferred_hotels (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  country text,
  city text not null,
  hotel text not null,
  priority int not null default 5 check (priority between 1 and 10),
  stars int check (stars between 1 and 5),
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists preferred_hotels_city on public.preferred_hotels (agency_id, lower(city), priority);
create unique index if not exists preferred_hotels_uniq on public.preferred_hotels (agency_id, lower(city), lower(hotel));

alter table public.preferred_hotels enable row level security;
drop policy if exists preferred_hotels_read on public.preferred_hotels;
create policy preferred_hotels_read on public.preferred_hotels for select to authenticated
  using (agency_id = public.my_agency());
drop policy if exists preferred_hotels_write on public.preferred_hotels;
create policy preferred_hotels_write on public.preferred_hotels for all to authenticated
  using (agency_id = public.my_agency() and public.my_role() in ('owner','agent'))
  with check (agency_id = public.my_agency() and public.my_role() in ('owner','agent'));

create or replace function public.preferred_hotels_touch() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists preferred_hotels_touch on public.preferred_hotels;
create trigger preferred_hotels_touch before update on public.preferred_hotels
  for each row execute function public.preferred_hotels_touch();

grant select, insert, update, delete on public.preferred_hotels to authenticated;
grant all on public.preferred_hotels to service_role;
