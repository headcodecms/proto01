import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { TABLES, table } from '../../../utils/db'

export const getRoles = async (
  supabase: SupabaseClient<any, 'public', any>,
  filter?: string
) => {
  const { data, error } = filter
    ? await getFilteredRoles(supabase, filter)
    : await getAllRoles(supabase)

  if (error) {
    const message = 'Error getting new users'
    console.error(message, error)
    throw new Error(message)
  }

  return data
}

export const setRole = async (
  supabase: SupabaseClient<any, 'public', any>,
  id: string,
  role: string
) => {
  const { error } = await supabase
    .from(table(TABLES.roles))
    .update({ role })
    .eq('id', id)
}

const getAllRoles = async (supabase: SupabaseClient<any, 'public', any>) => {
  return await supabase.from(table(TABLES.roles)).select().order('email')
}

const getFilteredRoles = async (
  supabase: SupabaseClient<any, 'public', any>,
  filter: string
) => {
  return await supabase
    .from(table(TABLES.roles))
    .select()
    .eq('role', filter)
    .order('email')
}
