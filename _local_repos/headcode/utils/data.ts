import { Data, FieldsData, SectionBase } from '../types'
import { v4 as uuidv4 } from 'uuid'
import { parseFields, parseSectionData } from './parser'
import { getCollectionConfig, getGlobalConfig } from './config'

export const getDefaultSectionData = (config: SectionBase) => ({
  id: uuidv4(),
  name: config.name,
  label: config.label,
  fields: parseFields({}, config.fields),
  blocks: config.blocks ? [] : null,
})

export const getDefaultBlockData = (name: string, config: SectionBase) => {
  if (Array.isArray(config.blocks)) {
    const blockConfig = config.blocks.find((item) => item.name === name)
    if (blockConfig) {
      return {
        id: uuidv4(),
        name: blockConfig.name,
        label: blockConfig.label,
        fields: parseFields({}, blockConfig.fields),
        blocks: blockConfig.blocks ? [] : null,
      }
    }
  }

  return null
}

export const getEmptySectionData = (name: string, label: string) => ({
  id: uuidv4(),
  name,
  label,
  fields: null,
  blocks: null,
})

export const findData = (list: Data[], id: string | null): Data | null => {
  for (let i = 0; i < list.length; i++) {
    const data = list[i]
    if (data.id === id) {
      return data
    } else {
      if (Array.isArray(data.blocks)) {
        const foundData = findData(data.blocks, id)
        if (foundData) {
          return foundData
        }
      }
    }
  }
  return null
}

export const removeFromData = (list: Data[], id: string): Data[] => {
  const filtered = list.filter((item) => item.id !== id)
  return filtered.map((item) => {
    if (!Array.isArray(item.blocks)) {
      return item
    }

    return { ...item, blocks: removeFromData(item.blocks, id) }
  })
}

export const getUpdatedFieldsData = (
  list: Data[],
  id: string,
  fields: FieldsData
): Data[] => {
  return list.map((item: Data) => {
    return {
      ...item,
      fields: item.id === id ? fields : item.fields,
      blocks: Array.isArray(item.blocks)
        ? getUpdatedFieldsData(item.blocks, id, fields)
        : null,
    }
  })
}

export const getUpdatedBlocksData = (
  list: Data[],
  id: string,
  blocks: Data[]
): Data[] => {
  return list.map((item: Data) => {
    if (item.id === id) {
      return {
        ...item,
        blocks,
      }
    }

    if (Array.isArray(item.blocks)) {
      return {
        ...item,
        blocks: getUpdatedBlocksData(item.blocks, id, blocks),
      }
    }

    return { ...item }
  })
}

type ListItem = {
  id: string
}

export const sortListByList = <T extends ListItem>(
  data: T[],
  list: ListItem[]
) => {
  const listIds = list.map((item) => item.id)
  return data.sort((a, b) => listIds.indexOf(a.id) - listIds.indexOf(b.id))
}

export const findSectionData = (
  data: any,
  sectionName: string,
  name: string,
  slug?: string
) => {
  const config = slug ? getCollectionConfig(name) : getGlobalConfig(name)
  if (!config) return null

  const sectionData = parseSectionData(data, config)
  return sectionData.find((item: any) => item.name === sectionName)
}
