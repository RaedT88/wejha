-- Contract booking requests created by the WhatsApp agent (service role) and handled in Wejha / the partner portal.
grant select, update on public.package_requests to authenticated;
grant select, insert, update on public.package_requests to service_role;
notify pgrst, 'reload schema';
