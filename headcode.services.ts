import { ServicesConfig } from "./_local_repos/headcode/types"

const config: ServicesConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    connectionString: process.env.SUPABASE_CONNECTION_STRING!,
    rowLevelSecurity: true,
    revalidate: 0,
    storage: {
      bucket: 'headcode',
      version: 'v1',
    },
  },
  auth: 'supabase',
  db: 'supabase',
  storage: 'supabase',
}

export default config
