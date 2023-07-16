import config from '@/headcode.config'

export const getSectionConfig = (name: string) => {
  let sectionConfig = config.globals?.find((item) => item.name === name)
  if (sectionConfig) {
    return sectionConfig
  }

  sectionConfig = config.collections?.find((item) => item.name === name)
  if (sectionConfig) {
    return sectionConfig
  }

  throw new Error(`Error getting section config with name ${name}`)
}

export const getDefaultSection = (
  name: string,
  slug: string | undefined,
  locale: string | undefined
) => ({
  name,
  slug: slug ?? null,
  locale: locale ?? null,
  meta: null,
  data: null,
  tags: null,
})

