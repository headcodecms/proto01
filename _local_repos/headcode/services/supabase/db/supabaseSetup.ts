import postgres from 'postgres'
import { SupabaseClient, User } from '@supabase/supabase-js'
import config from '@/headcode.config'
import { table, cloneTable, TABLES, ROLES } from '../../../utils/db'
import { STORAGE_BUCKET } from '../SupabaseStorage'

const sqlOptions = {
  idle_timeout: 20,
  max_lifetime: 60 * 10,
}

export const setup = async (supabase: SupabaseClient<any, 'public', any>) => {
  const userData = await supabase.auth.getUser()
  if (userData.error) {
    console.error('Setup error: Getting user', userData.error)
    throw new Error(userData.error.message)
  }
  if (!userData.data.user) {
    const message = 'Setup error: User is null'
    console.error(message)
    throw new Error(message)
  }
  const user = userData.data.user

  if (config.clone) {
    const isAdmin = await isCloneAdmin(supabase, user)
    if (!isAdmin) {
      throw Error(
        `Clone error: user ${user.email} is not admin of version ${config.clone}`
      )
    }
  }

  await createTables()

  const bucket = STORAGE_BUCKET
  if (bucket) {
    await createStorage(supabase, bucket)
  }

  if (config.clone) {
    await copyDataFromClone()
  } else {
    await insertAdmin(supabase, user)
  }
}

const isCloneAdmin = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User
) => {
  const { data } = await supabase
    .from(cloneTable(TABLES.roles))
    .select()
    .eq('user_id', user.id)

  if (data && data.length === 1 && data[0].role === ROLES.admin) {
    return true
  }

  return false
}

const insertAdmin = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User
) => {
  const { error } = await supabase.from(table(TABLES.roles)).insert([
    {
      role: ROLES.admin,
      email: user.email,
      user_id: user.id,
    },
  ])

  if (error) {
    console.error('Setup error: Creating admin user', error)
    throw new Error(error.message)
  }
}

// TODO: add option to clone user generated postgres resources like custom stored procedures
const copyDataFromClone = async () => {
  const connectionString = process.env.SUPABASE_CONNECTION_STRING
  if (connectionString) {
    const sql = postgres(connectionString, sqlOptions)

    await sql`
INSERT INTO ${sql(table(TABLES.roles))}
  SELECT * 
  FROM ${sql(cloneTable(TABLES.roles))};
`

    await sql`
INSERT INTO ${sql(table(TABLES.sections))}
  SELECT * 
  FROM ${sql(cloneTable(TABLES.sections))};
`
  } else {
    const message =
      'current version requires config.services.supabase.connectionString'

    console.error(message)
    throw new Error(message)
  }
}

const createTables = async () => {
  const connectionString = process.env.SUPABASE_CONNECTION_STRING
  if (connectionString) {
    const sql = postgres(connectionString, sqlOptions)
    const version = await sql`SELECT version();`
    console.log('Version 15 required', version)

    await sql`
CREATE TABLE public.${sql(table(TABLES.roles))} (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  email text NOT NULL,
  role text NOT NULL,
  user_id uuid,
  CONSTRAINT ${sql(
    table(TABLES.roles) + '_user_id_fk'
  )} FOREIGN KEY(user_id) REFERENCES auth.users(id),
  CONSTRAINT ${sql(table(TABLES.roles) + '_email_role_uq')} UNIQUE (email, role)
);`

    await sql`
CREATE TABLE public.${sql(table(TABLES.sections))} (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  published_at timestamp with time zone DEFAULT now(),
  name text NOT NULL,
  slug text,
  locale text,
  meta jsonb,
  tags text[],
  data jsonb,
  CONSTRAINT ${sql(
    table(TABLES.sections) + '_name_slug_uq'
  )} UNIQUE NULLS NOT DISTINCT (name, slug)
);`

    const rowLevelSecurity = true
    if (rowLevelSecurity) {
      await sql`
ALTER TABLE public.${sql(table(TABLES.roles))} ENABLE ROW LEVEL SECURITY;`

      await sql`
CREATE POLICY "Every authenticated user can create a new role" 
  ON public.${sql(table(TABLES.roles))}
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);`

      await sql`
CREATE POLICY "Enable all actions for admins"
  ON public.${sql(table(TABLES.roles))}
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);`

      await sql`
ALTER TABLE public.${sql(table(TABLES.sections))} ENABLE ROW LEVEL SECURITY;`

      await sql`
CREATE POLICY "Sections are viewable by everyone."
  ON public.${sql(table(TABLES.sections))} 
  FOR SELECT TO authenticated, anon
  USING (true);`

      await sql`
CREATE POLICY "Enable all actions for editors and admins."
  ON public.${sql(table(TABLES.sections))} 
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.${sql(table(TABLES.roles))}
      WHERE auth.uid() = user_id
    )
  );`
    }
  } else {
    const message =
      'current version requires config.services.supabase.connectionString'

    console.error(message)
    throw new Error(message)
  }
}

const createStorage = async (
  supabase: SupabaseClient<any, 'public', any>,
  bucket: string
) => {
  const { data: bucketExists } = await supabase.storage.getBucket(bucket)
  if (bucketExists) return

  const supabaseConnectionString =
    process.env.SUPABASE_CONNECTION_STRING ?? false
  if (supabaseConnectionString) {
    // @ts-ignore
    const sql = postgres(supabaseConnectionString, sqlOptions)

    try {
      await sql`
CREATE POLICY "Every authenticated user can create a bucket" 
  ON storage.buckets
  FOR INSERT TO authenticated
  WITH CHECK (true);`
    } catch (error) {
      console.error('Setup warning: Creating buckets policy', error)
    }

    const { error } = await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 2 * 1024 * 1024,
    })

    if (error) {
      console.error('Setup error: Creating storage bucket', bucket)
    } else {
      await sql`
CREATE POLICY "Enable SELECT for all users" 
  ON storage.objects 
  FOR SELECT TO public 
  USING (bucket_id = 'headcode');`

    await sql`
CREATE POLICY "Enable all actions for authenticated users" 
  ON storage.objects 
  FOR INSERT TO authenticated 
  WITH CHECK (bucket_id = 'headcode');`
    }
  } else {
    const message =
      'current version requires config.services.supabase.connectionString'

    console.error(message)
    throw new Error(message)
  }
}
