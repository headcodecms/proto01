import {
  SectionBase,
  SectionBlock,
  SectionFields,
  SectionTypeConfig,
  SectionConfig,
} from '../types'
import { getSectionConfig } from './config'
import { v4 as uuidv4 } from 'uuid'

export const parseData = (data: any, name: string) => {
  const sectionConfig = getSectionConfig(name)
  const metaData = sectionConfig.metadata ? parseMetadata(data) : null
  let sectionData = parseSectionData(data, sectionConfig)

  if (sectionConfig.limit === 1 && sectionData.length === 0) {
    if (Array.isArray(sectionConfig.sections)) {
      if (sectionConfig.sections.length !== 1) {
        throw Error(`No section config for ${name} found`)
      }
      sectionData.push(getDefaultSectionData(sectionConfig.sections[0]))
    }
  }

  return {
    ...data,
    meta: metaData,
    data: sectionData,
    locale: getValue(data, 'locale', null),
    tags: getValue(data, 'tags', null),
  }
}

export const getDefaultSectionData = (config: SectionConfig) => ({
  id: uuidv4(),
  name: config.name,
  label: config.label,
  fields: parseFields({}, config.fields),
  blocks: null,
})

const parseMetadata = (data: any) => {
  return {
    title: getValue(data, 'title', ''),
    description: getValue(data, 'description', ''),
  }
}

const parseSectionData = (data: any, config: SectionTypeConfig) => {
  let sections = Array.isArray(data.data) ? data.data : []
  sections = sections.filter(
    (item: any) => findMatchingConfig(item.name, config.sections) !== null
  )

  return sections.map((item: any) => {
    const sectionConfig = findMatchingConfig(item.name, config.sections)
    if (!sectionConfig) return null

    return {
      id: item.id,
      name: item.name,
      label: sectionConfig.label,
      fields: parseFields(item.fields, sectionConfig.fields),
      blocks: parseBlocks(item.blocks, sectionConfig.blocks),
    }
  })
}

const parseFields = (fields: any, fieldsConfig: SectionFields) => {
  const obj: any = {}
  for (const [key, value] of Object.entries(fieldsConfig)) {
    // TODO: validate that fields[key] is correct type and has all props - e.g., img
    obj[key] = fields.hasOwnProperty(key)
      ? fields[key]
      : value.type.defaultValue
  }

  return obj
}

const parseBlocks = (
  blocks: any,
  blocksConfig: SectionBlock[] | undefined
): any => {
  if (!Array.isArray(blocks) || !blocksConfig) return null
  const filteredBlocks = blocks.filter(
    (item: any) => findMatchingConfig(item.name, blocksConfig) !== null
  )

  return filteredBlocks.map((item: any) => {
    const blockConfig = findMatchingConfig(item.name, blocksConfig)
    if (!blockConfig) return null

    return {
      id: item.id,
      name: item.name,
      label: blockConfig.label,
      fields: parseFields(item.fields, blockConfig.fields),
      blocks: parseBlocks(item.blocks, blockConfig.blocks),
    }
  })
}

const findMatchingConfig = (
  name: string,
  config: boolean | SectionBase | SectionBase[] | undefined
) => {
  if (!Array.isArray(config)) {
    return null
  }

  return config.find((item) => item.name === name)
}

const getValue = (data: any, key: string, defaultValue: any) => {
  if (data?.hasOwnProperty(key)) {
    return data[key]
  }

  return defaultValue
}
