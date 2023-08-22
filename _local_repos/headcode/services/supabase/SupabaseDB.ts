import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { setup as supabaseSetup } from './db/supabaseSetup'
import {
  getRoles as getSupabaseRoles,
  setRole as setSupabaseRole,
} from './db/supabaseRoles'
import {
  addSection as addSupabaseSection,
  deleteSection as deleteSupabaseSection,
  getCollections as getSupabaseCollections,
  findCollections as findSupabaseCollections,
  getSection as getSupabaseSection,
  saveSection as saveSupabaseSection,
} from './db/supabaseSections'
import { CollectionOptions, DBInterface, Section } from '../../types'

const supabaseClient = () => createServerComponentClient({ cookies })

const setup = async (): Promise<void> => {
  const supabase = supabaseClient()
  return await supabaseSetup(supabase)
}

const getRoles = async (filter?: string) => {
  const supabase = supabaseClient()
  return await getSupabaseRoles(supabase, filter)
}

const setRole = async (id: string, role: string) => {
  const supabase = supabaseClient()
  return await setSupabaseRole(supabase, id, role)
}

const getCollections = async (name: string, locale?: string) => {
  const supabase = supabaseClient()
  return await getSupabaseCollections(supabase, name, locale)
}

const findCollections = async (name: string, options?: CollectionOptions) => {
  const supabase = supabaseClient()
  return await findSupabaseCollections(supabase, name, options)
}


const saveSection = async (section: Section) => {
  const supabase = supabaseClient()
  return await saveSupabaseSection(supabase, section)
}

const deleteSection = async (id: string) => {
  const supabase = supabaseClient()
  return await deleteSupabaseSection(supabase, id)
}

const addSection = async (name: string, slug: string, locale?: string) => {
  const supabase = supabaseClient()
  return await addSupabaseSection(supabase, name, slug, locale)
}

const getSection = async (name: string, slug?: string, locale?: string) => {
  const supabase = supabaseClient()
  return await getSupabaseSection(supabase, name, slug, locale)
}

const SupabaseDB: DBInterface = {
  setup,
  getRoles,
  setRole,
  getCollections,
  findCollections,
  saveSection,
  deleteSection,
  addSection,
  getSection,
}

export default SupabaseDB
