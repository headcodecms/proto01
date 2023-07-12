# Headcode CMS

## Open Issues

### supabaseSetup.ts

CREATE POLICY "Enable SELECT for all users" 
  ON storage.objects 
  FOR SELECT TO public 
  USING (bucket_id = 'headcode');`

Parameter ${bucket} for headcode does not work

### supabaseSetup.ts

      await sql`
CREATE POLICY "Enable all actions for admins"
  ON public.${sql(table(TABLES.roles))}
  FOR ALL TO authenticated
  USING (role = 'admin')
  WITH CHECK (role = 'admin');`

Infinite recursion when testing on roles table.
Enabled all actions to all authenticated users.

