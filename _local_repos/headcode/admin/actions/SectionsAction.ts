'use server'

import { Section } from '../../types'
import config from '@/headcode.config'
import supabaseDb from '../../services/supabase/supabaseDb'

export const saveSection = async (section: Section) => {
  const dbService = supabaseDb(config.services.supabase)
  return dbService.saveSection(section)
}

export const deleteSection = async (id: string) => {
  const dbService = supabaseDb(config.services.supabase)
  return dbService.deleteSection(id)
}

export const addSection = async (
  name: string,
  slug: string,
  locale?: string
) => {
  const dbService = supabaseDb(config.services.supabase)
  return dbService.addSection(name, slug, locale)
}
