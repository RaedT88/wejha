-- Two-step partner reply: "available" first (no number), then the hotel confirmation number; or "not available".
alter table public.package_requests drop constraint if exists package_requests_partner_status_check;
alter table public.package_requests add constraint package_requests_partner_status_check check (partner_status in ('awaiting','available','confirmed','rejected'));
alter table public.package_requests add column if not exists partner_available_at timestamptz;

create or replace function public.partner_update_request(p_id uuid, p_action text, p_conf_no text default null, p_note text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare pid uuid := public.my_partner(); r record;
begin
  if pid is null then raise exception 'not_partner'; end if;
  if p_action not in ('available','confirmed','rejected') then raise exception 'bad_action'; end if;
  if p_action = 'confirmed' and coalesce(trim(p_conf_no),'') = '' then raise exception 'conf_no_required'; end if;
  update public.package_requests set
    partner_status = p_action,
    partner_available_at = case when p_action in ('available','confirmed') then coalesce(partner_available_at, now()) else partner_available_at end,
    partner_conf_no = case when p_action = 'confirmed' then trim(p_conf_no) else partner_conf_no end,
    partner_note = coalesce(nullif(trim(coalesce(p_note,'')),''), partner_note),
    partner_responded_at = now(), updated_at = now()
  where id = p_id and partner_id = pid
  returning ref, partner_status into r;
  if not found then raise exception 'not_found'; end if;
  return jsonb_build_object('ref', r.ref, 'partner_status', r.partner_status);
end $$;
revoke all on function public.partner_update_request(uuid,text,text,text) from public, anon;
grant execute on function public.partner_update_request(uuid,text,text,text) to authenticated;
notify pgrst, 'reload schema';
