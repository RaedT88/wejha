-- Wejha campaigns: offers library + per-customer send log (moved from the old LuxeCheck operations site).
-- Run once in Supabase → SQL Editor.

create table if not exists public.marketing_offers (
  id          uuid primary key default gen_random_uuid(),
  agency_id   uuid not null references public.agencies(id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 120),
  kind        text not null default 'package' check (kind in ('package','promo','hotel','event')),
  status      text not null default 'draft' check (status in ('draft','approved','archived')),
  body        text not null check (char_length(body) between 1 and 1024),
  cta_label   text not null default 'اطلب العرض' check (char_length(cta_label) between 1 and 20),
  media_b64   text,
  media_mime  text check (media_mime is null or media_mime in ('image/jpeg','image/png','video/mp4','application/pdf')),
  media_kind  text check (media_kind is null or media_kind in ('image','video','document')),
  media_name  text,
  valid_to    date,
  created_by  uuid default auth.uid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint marketing_media_size check (media_b64 is null or char_length(media_b64) <= 5592410)
);
create index if not exists marketing_offers_agency_idx on public.marketing_offers(agency_id, status);

create table if not exists public.marketing_sends (
  id          uuid primary key default gen_random_uuid(),
  agency_id   uuid not null references public.agencies(id) on delete cascade,
  offer_id    uuid not null references public.marketing_offers(id) on delete cascade,
  sender      text not null,
  request_id  text not null,
  provider_id text,
  ok          boolean not null default true,
  error       text,
  sent_by     uuid default auth.uid(),
  sent_at     timestamptz not null default now()
);
create index if not exists marketing_sends_offer_idx on public.marketing_sends(agency_id, offer_id, sent_at desc);
create unique index if not exists marketing_sends_req_uq on public.marketing_sends(request_id);

alter table public.marketing_offers enable row level security;
alter table public.marketing_sends  enable row level security;

drop policy if exists mo_read  on public.marketing_offers;
drop policy if exists mo_write on public.marketing_offers;
create policy mo_read  on public.marketing_offers for select using (agency_id = public.my_agency());
create policy mo_write on public.marketing_offers for all
  using (agency_id = public.my_agency() and public.my_role() in ('owner','agent'))
  with check (agency_id = public.my_agency() and public.my_role() in ('owner','agent'));

drop policy if exists ms_read   on public.marketing_sends;
drop policy if exists ms_insert on public.marketing_sends;
create policy ms_read   on public.marketing_sends for select using (agency_id = public.my_agency());
create policy ms_insert on public.marketing_sends for insert
  with check (agency_id = public.my_agency() and public.my_role() in ('owner','agent'));

-- Only the owner approves offers; agents can draft and edit drafts.
create or replace function public.marketing_offers_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  if public.my_role() is distinct from 'owner' then
    if tg_op = 'INSERT' then
      new.status := 'draft';
    elsif old.status = 'approved' and (new.body, new.cta_label, new.media_b64, new.title) is distinct from (old.body, old.cta_label, old.media_b64, old.title) then
      new.status := 'draft';
    elsif new.status = 'approved' and old.status <> 'approved' then
      raise exception 'owner_only';
    end if;
  end if;
  return new;
end $$;
drop trigger if exists marketing_offers_guard on public.marketing_offers;
create trigger marketing_offers_guard before insert or update on public.marketing_offers
  for each row execute function public.marketing_offers_guard();

grant select, insert, update, delete on public.marketing_offers to authenticated;
grant select, insert on public.marketing_sends to authenticated;
