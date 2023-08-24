import { DBService } from '../server'
import { MetaData } from '../types'

export const getPrevSectionValue = (
  sections: any[],
  currentIndex: number,
  field: string,
  defaultValue?: any
) => {
  return getIndexSectionValue(sections, currentIndex - 1, field, defaultValue)
}

export const getNextSectionValue = (
  sections: any[],
  currentIndex: number,
  field: string,
  defaultValue?: any
) => {
  return getIndexSectionValue(sections, currentIndex + 1, field, defaultValue)
}

export const getIndexSectionValue = (
  sections: any[],
  currentIndex: number,
  field: string,
  defaultValue?: any
) => {
  if (currentIndex < 0 || currentIndex >= sections.length) {
    return defaultValue ?? null
  }

  const section = sections[currentIndex]
  if (section.fields && section.fields.hasOwnProperty(field)) {
    return section.fields[field]
  }

  return defaultValue ?? null
}

export const getMetadata = async (
  name: string,
  slug?: string,
  locale?: string
) => {
  try {
    const data = await DBService.getSection(name, slug, locale)
    if (data.length === 1) {
      const meta = data[0].meta
      if (meta) {
        const obj: MetaData = {}
        if (meta.title.length > 0) obj.title = meta.title
        if (meta.description.length > 0) obj.description = meta.description
  
        return obj
      }
    }
  } catch (error) {
    console.error(error)
  }

  return null
}
