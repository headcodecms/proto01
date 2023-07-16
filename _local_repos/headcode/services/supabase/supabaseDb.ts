import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { DBInterface, Section, SupabaseConfig } from '../../types'
import { cookies } from 'next/headers'
import { setup } from './supabaseSetup'
import { getRoles, setRole } from './supabaseRoles'
import { addSection, deleteSection, getCollections, getSection, saveSection } from './supabaseSections'

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
    },

    getCollections: async (name: string, locale?: string) => {
      return await getCollections(supabase, name, locale)
    },

    saveSection: async (section: Section) => {
      return await saveSection(supabase, section)
    },

    deleteSection: async (id: string) => {
      return await deleteSection(supabase, id)
    },

    addSection: async (name: string, slug: string, locale?: string) => {
      return await addSection(supabase, name, slug, locale)
    },

    getSection: async (name: string, slug?: string, locale?: string) => {
      return await getSection(supabase, name, slug, locale)
    }
  }
}

export default supabaseDb
