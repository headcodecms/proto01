import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { TABLES, table } from '../../../utils/db'
import { CollectionOptions, Section } from '../../../types'

export const getCollections = async (
  supabase: SupabaseClient<any, 'public', any>,
  name: string,
  locale?: string
) => {
  const { data, error } = locale
    ? await supabase
        .from(table(TABLES.sections))
        .select('name, slug')
        .match({ name, locale })
        .order('published_at')
    : await supabase
        .from(table(TABLES.sections))
        .select('name, slug')
        .match({ name })
        .is('locale', null)
        .order('published_at')

  if (error) {
    const message = 'Error getting collections'
    console.error(message, error)
    throw new Error(message)
  }

  return data
}

export const findCollections = async (
  supabase: SupabaseClient<any, 'public', any>,
  name: string,
  options?: CollectionOptions
) => {
  const locale = options?.locale ?? null

  const { data, error } = locale
    ? await supabase
        .from(table(TABLES.sections))
        .select()
        .match({ name, locale })
        .order('published_at')
    : await supabase
        .from(table(TABLES.sections))
        .select()
        .match({ name })
        .is('locale', null)
        .order('published_at')

  if (error) {
    const message = 'Error getting collections'
    console.error(message, error)
    throw new Error(message)
  }

  return data
}

export const saveSection = async (
  supabase: SupabaseClient<any, 'public', any>,
  section: Section
) => {
  const { error } = await supabase.from(table(TABLES.sections)).upsert(section)

  return error
}

export const deleteSection = async (
  supabase: SupabaseClient<any, 'public', any>,
  id: string
) => {
  const { error } = await supabase
    .from(table(TABLES.sections))
    .delete()
    .eq('id', id)
  if (error) {
    console.error('error deleting record.', error, id)
  }
}

export const addSection = async (
  supabase: SupabaseClient<any, 'public', any>,
  name: string,
  slug: string,
  locale?: string | null
) => {
  const { error } = await supabase
    .from(table(TABLES.sections))
    .insert({ name, slug, locale })

  return error
}

export const getSection = async (
  supabase: SupabaseClient<any, 'public', any>,
  name: string,
  slug?: string | null,
  locale?: string | null
) => {
  const { data, error } = await querySection(supabase, name, slug, locale)
  if (error) {
    const message = 'Error getting section'
    console.error(message, error)
    throw new Error(message)
  }

  return data
}

const querySection = async (
  supabase: SupabaseClient<any, 'public', any>,
  name: string,
  slug?: string | null,
  locale?: string | null
) => {
  if (slug) {
    return locale
      ? await supabase
          .from(table(TABLES.sections))
          .select()
          .match({ name, slug, locale })
      : await supabase
          .from(table(TABLES.sections))
          .select()
          .match({ name, slug })
          .is('locale', null)
  } else {
    return locale
      ? await supabase
          .from(table(TABLES.sections))
          .select()
          .match({ name, locale })
          .is('slug', null)
      : await supabase
          .from(table(TABLES.sections))
          .select()
          .match({ name })
          .is('locale', null)
          .is('slug', null)
  }
}
