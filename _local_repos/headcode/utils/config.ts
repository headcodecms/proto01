import config from '@/headcode.config'
import { Data } from '../types'

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

export const getSectionListData = (data: Data[]) => {
  return data.map((item: Data) => ({
    id: item.id,
    name: item.name,
    label: item.label,
  }))
}

type ListItem = {
  id: string
}
export const sortListByList = (data: ListItem[], list: ListItem[]) => {
  const listIds = list.map((item) => item.id)
  return data.sort((a, b) => listIds.indexOf(a.id) - listIds.indexOf(b.id))
}
