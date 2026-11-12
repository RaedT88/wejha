-- Contracts: staff (Sales agent) can upload and edit, but only the Owner sets the margin and approves.
-- A staff edit to an approved contract sends it back to "pending" until the Owner approves it again.
create or replace function public.package_contracts_guard() returns trigger language plpgsql security definer set search_path = public as $$
declare r text := public.my_role();
begin
  if r is null or r = 'owner' then return new; end if;   -- owner, n8n (service role) and partner RPCs are not affected
  if tg_op = 'INSERT' then
    if new.status not in ('draft', 'pending') then new.status := 'pending'; end if;
    new.margin_type := 'percent'; new.margin_value := 0;
    return new;
  end if;
  new.margin_type := old.margin_type; new.margin_value := old.margin_value;
  if new.status = 'archived' and old.status <> 'archived' then raise exception 'owner_only'; end if;
  if new.status = 'approved' and old.status <> 'approved' then new.status := 'pending'; end if;
  if old.status = 'approved' and new.status = 'approved' and (
       new.data is distinct from old.data or new.valid_from is distinct from old.valid_from or new.valid_to is distinct from old.valid_to
       or new.book_by is distinct from old.book_by or new.currency is distinct from old.currency or new.kind is distinct from old.kind) then
    new.status := 'pending';
  end if;
  return new;
end $$;
drop trigger if exists package_contracts_guard on public.package_contracts;
create trigger package_contracts_guard before insert or update on public.package_contracts
  for each row execute function public.package_contracts_guard();
