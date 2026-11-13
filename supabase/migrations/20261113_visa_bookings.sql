-- Wejha: hotel bookings for visa applications (Schengen, UK, Canada, USA).
-- Customer asks on WhatsApp → picks one of the agency's visa hotels → pays the service fee →
-- staff books a free-cancellation room manually, issues the booking file, and cancels before the deadline.

create table if not exists public.visa_hotels (
  id         uuid primary key default gen_random_uuid(),
  agency_id  uuid not null references public.agencies(id) on delete cascade,
  country    text not null,
  city       text,
  hotel      text not null,
  address    text,
  phone      text,
  stars      int check (stars between 1 and 5),
  priority   int not null default 5 check (priority between 1 and 10),
  notes      text,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists visa_hotels_uq on public.visa_hotels(agency_id, lower(country), lower(hotel));

create table if not exists public.visa_settings (
  agency_id    uuid primary key references public.agencies(id) on delete cascade,
  active       boolean not null default true,
  fee          numeric not null default 35,
  currency     text not null default 'SAR',
  payment_text text,
  updated_at   timestamptz not null default now()
);

create table if not exists public.visa_bookings (
  id              uuid primary key default gen_random_uuid(),
  agency_id       uuid not null references public.agencies(id) on delete cascade,
  ref             text not null,
  customer_phone  text not null,
  country         text not null,
  city            text,
  hotel           text,
  hotel_address   text,
  hotel_phone     text,
  hotel_stars     int,
  checkin         date not null,
  checkout        date not null,
  persons         int not null default 1 check (persons between 1 and 20),
  rooms           int not null default 1 check (rooms between 1 and 10),
  guests          jsonb not null default '[]'::jsonb,
  room_type       text,
  board           text,
  fee             numeric not null default 35,
  currency        text not null default 'SAR',
  status          text not null default 'awaiting_payment' check (status in ('awaiting_payment','paid','booked','delivered','cancelled','refused')),
  paid_note       text,
  confirmation_no text,
  supplier        text,
  supplier_ref    text,
  cancel_deadline timestamptz,
  cancelled_at    timestamptz,
  notes           text,
  source          text not null default 'whatsapp',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create unique index if not exists visa_bookings_ref_uq on public.visa_bookings(agency_id, ref);
create index if not exists visa_bookings_status_idx on public.visa_bookings(agency_id, status, created_at desc);

alter table public.visa_hotels   enable row level security;
alter table public.visa_settings enable row level security;
alter table public.visa_bookings enable row level security;

drop policy if exists vh_read on public.visa_hotels;  drop policy if exists vh_write on public.visa_hotels;
create policy vh_read  on public.visa_hotels for select using (agency_id = public.my_agency());
create policy vh_write on public.visa_hotels for all
  using (agency_id = public.my_agency() and public.my_role() in ('owner','agent'))
  with check (agency_id = public.my_agency() and public.my_role() in ('owner','agent'));

drop policy if exists vs_read on public.visa_settings; drop policy if exists vs_write on public.visa_settings;
create policy vs_read  on public.visa_settings for select using (agency_id = public.my_agency());
create policy vs_write on public.visa_settings for all
  using (agency_id = public.my_agency() and public.my_role() = 'owner')
  with check (agency_id = public.my_agency() and public.my_role() = 'owner');

drop policy if exists vb_read on public.visa_bookings; drop policy if exists vb_write on public.visa_bookings;
create policy vb_read  on public.visa_bookings for select using (agency_id = public.my_agency());
create policy vb_write on public.visa_bookings for all
  using (agency_id = public.my_agency() and public.my_role() in ('owner','agent'))
  with check (agency_id = public.my_agency() and public.my_role() in ('owner','agent'));

create or replace function public.visa_touch() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists visa_bookings_touch on public.visa_bookings;
create trigger visa_bookings_touch before update on public.visa_bookings for each row execute function public.visa_touch();

grant select, insert, update, delete on public.visa_hotels, public.visa_settings, public.visa_bookings to authenticated;
grant select on public.visa_hotels, public.visa_settings to service_role;
grant select, insert, update on public.visa_bookings to service_role;
