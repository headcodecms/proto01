import { HeadcodeConfig, SectionConfig, SectionTypeConfig } from './types'

export const buildConfig = (config: HeadcodeConfig) => {
  checkDuplicates(config)

  const clone = config.clone ? config.clone : false
  const globals = parseSectionConfigs(config.globals)
  const collections = parseSectionConfigs(config.collections)

  return {
    version: config.version,
    clone,
    globals,
    collections,
  }
}

const checkDuplicates = (config: HeadcodeConfig) => {
  const arr: string[] = []

  config.globals?.forEach((item: any) => {
    if (arr.includes(item.name)) {
      throw new Error(`Duplicate name in headcode.comfig.ts ${item.name}`)
    }
    arr.push(item.name)
  })

  config.collections?.forEach((item: any) => {
    if (arr.includes(item.name)) {
      throw new Error(`Duplicate name in headcode.comfig.ts ${item.name}`)
    }
    arr.push(item.name)
  })
}

const parseSectionConfigs = (configs: SectionTypeConfig[] | undefined) => {
  if (!configs) return []

  return configs.map((item) => {
    const sectionsIsArray = Array.isArray(item.sections)
    const locales = item.locales ?? []
    const metadata = item.metadata ?? false
    const sections = parseSections(item.sections)
    const limit = sectionsIsArray ? item.limit ?? Number.MAX_SAFE_INTEGER : 1
    const presets = item.presets ?? (limit === 1 ? sections : [])

    return {
      name: item.name,
      locales,
      metadata,
      sections,
      limit,
      presets,
    }
  })
}

const parseSections = (
  sections: SectionConfig | SectionConfig[] | boolean | undefined
): SectionConfig | SectionConfig[] | boolean => {
  if (!sections) {
    return false
  }

  if (typeof sections === 'boolean' || Array.isArray(sections)) {
    return sections
  }

  return [sections]
}

export const buildSection = (config: SectionConfig) => {
  // TODO: check that all names and block names are unique
  return {
    ...config,
    theme: config.theme ?? 'custom',
  }
}
