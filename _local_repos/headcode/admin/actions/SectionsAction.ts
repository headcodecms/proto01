'use server'

import { Section } from '../../types'
import DBService from '../../services/DBService'

export const saveSection = async (section: Section) => {
  return DBService.saveSection(section)
}

export const deleteSection = async (id: string) => {
  return DBService.deleteSection(id)
}

export const addSection = async (
  name: string,
  slug: string,
  locale?: string
) => {
  return DBService.addSection(name, slug, locale)
}
