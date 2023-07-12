import { HeadcodeConfig, SectionConfig, SectionTypeConfig } from './types'

const buildConfig = (config: HeadcodeConfig) => {
  const clone = config.clone ? config.clone : false
  const globals = parseSectionConfigs(config.globals)
  const collections = parseSectionConfigs(config.collections)

  return {
    version: config.version,
    clone,
    services: config.services,
    globals,
    collections,
  }
}

const parseSectionConfigs = (configs: SectionTypeConfig[] | undefined) => {
  if (!configs) return []

  return configs.map((item) => {
    const sectionsIsArray = Array.isArray(item.sections)
    const locales = item.locales ?? []
    const metadata = item.metadata ?? false
    const sections = item.sections
      ? sectionsIsArray
        ? item.sections
        : [item.sections]
      : false
    const presets = item.presets ?? false
    const limit = sectionsIsArray ? item.limit ?? Number.MAX_SAFE_INTEGER : 1
    const renderer = item.renderer ?? 'defaultRenderer'

    return {
      name: item.name,
      locales,
      metadata,
      sections,
      presets,
      limit,
      renderer,
    }
  })
}

const buildSection = (config: SectionConfig) => {
  return {
    ...config,
    theme: config.theme ?? 'custom',
  }
}

export { buildConfig, buildSection }
