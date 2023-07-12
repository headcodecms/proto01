import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { DBInterface, SupabaseConfig } from '../../types'
import { cookies } from 'next/headers'
import { setup } from './supabaseSetup'
import { getRoles, setRole } from './supabaseRoles'

const supabaseDb = (config: SupabaseConfig): DBInterface => {
  const supabase = createServerComponentClient(
    { cookies },
    {
      supabaseUrl: config.url,
      supabaseKey: config.anon,
      options: {
        global: {
          fetch: (...args: any[]) =>
            fetch(args[0], {
              ...args[1],
              next: { revalidate: config.revalidate },
            }),
        },
      },
    }
  )

  return {
    setup: async () => {
      return await setup(supabase)
    },

    getRoles: async (filter?: string) => {
      return await getRoles(supabase, filter)
    },

    setRole: async (id: string, role: string) => {
      return await setRole(supabase, id, role)
    }
  }
}

export default supabaseDb
