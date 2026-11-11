-- Tables created by later migrations were missing role grants, so PostgREST
-- returned "permission denied" (RLS policies still decide which rows each user sees).
grant select, insert, update, delete on public.agency_services to authenticated;
grant all on public.agency_services to service_role;

grant select, insert, update, delete on public.package_contracts to authenticated;
grant all on public.package_contracts to service_role;

grant select on public.agency_channels to authenticated;
grant all on public.agency_channels to service_role;

notify pgrst, 'reload schema';
