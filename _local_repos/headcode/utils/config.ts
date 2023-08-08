import config from '@/headcode.config'
import { Data, SectionBase } from '../types'

export const getGlobalConfig = (name: string) => {
  return config.globals?.find((item) => item.name === name)
}

export const getCollectionConfig = (name: string) => {
  return config.collections?.find((item) => item.name === name)
}

export const getSectionConfig = (name: string) => {
  let sectionConfig = getGlobalConfig(name)
  if (sectionConfig) {
    return sectionConfig
  }

  sectionConfig = getCollectionConfig(name)
  if (sectionConfig) {
    return sectionConfig
  }

  throw new Error(`Error getting section config with name ${name}`)
}

export const findMatchingConfig = <T extends SectionBase>(
  name: string | null,
  config: boolean | T | T[] | undefined
): T | SectionBase | null => {
  if (!Array.isArray(config)) {
    return null
  }

  for (let i = 0; i < config.length; i++) {
    const currentConfig = config[i]
    if (currentConfig.name === name) {
      return currentConfig
    } else {
      if (Array.isArray(currentConfig.blocks)) {
        const foundConfig = findMatchingConfig(name, currentConfig.blocks)
        if (foundConfig) {
          return foundConfig
        }
      }
    }
  }

  return null
}

export const getDefaultSection = (
  name: string,
  slug: string | null | undefined,
  locale: string | null | undefined
) => ({
  name,
  slug: slug ?? null,
  locale: locale ?? null,
  meta: null,
  data: null,
  tags: null,
})

export const getSectionListData = (data: Data[]) => {
  return data.map((item: Data) => ({
    id: item.id,
    name: item.name,
    label: item.label,
  }))
}
