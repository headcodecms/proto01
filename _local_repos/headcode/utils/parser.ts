import {
  SectionBlock,
  SectionFields,
  SectionTypeConfig,
  Section,
  MetaData,
  Data,
  EditorNav,
} from '../types'
import { findMatchingConfig, getSectionConfig } from './config'
import { getDefaultSectionData } from './data'

export const parseData = (data: Section, name: string) => {
  const sectionConfig = getSectionConfig(name)
  const metaData = sectionConfig.metadata ? parseMetadata(data.meta) : null
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
    tags: getValue(data, 'tags', []),
  }
}

const parseMetadata = (data: MetaData | null) => {
  return {
    title: getValue(data, 'title', ''),
    description: getValue(data, 'description', ''),
  }
}

const parseSectionData = (data: Section, config: SectionTypeConfig) => {
  let sections: Data[] = []
  if (Array.isArray(data.data)) {
    sections = data.data
  } else if (
    config.limit &&
    config.limit === 1 &&
    Array.isArray(config.sections) &&
    config.sections.length === 1
  ) {
    sections.push(getDefaultSectionData(config.sections[0]))
  }

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

export const parseFields = (fields: any, fieldsConfig: SectionFields) => {
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

const getValue = (data: any, key: string, defaultValue: any) => {
  if (data?.hasOwnProperty(key)) {
    return data[key] ?? defaultValue
  }

  return defaultValue
}

export const getNavId = (nav: EditorNav) =>
  nav.blocks.length === 0 ? nav.section : nav.blocks[nav.blocks.length - 1]
