import React from 'react'
import { SectionConfig, SectionTypeConfig } from '../types'
import Banner from '../ui/Banner'
import { findMatchingConfig } from '../utils/config'

const RenderSection = ({
  id,
  name,
  slug,
  locale,
  section,
  config,
}: {
  id: string | null
  name: string
  slug?: string | null
  locale?: string | null
  section: any
  config: SectionTypeConfig
}) => {
  const sectionConfig = findMatchingConfig<SectionConfig>(
    section.name,
    config.sections
  )
  console.log('RenderSection', section, config, sectionConfig)

  if (!sectionConfig) {
    return (
      <Banner size="xs" error={true}>
        No section config for name: ${section.name} available
      </Banner>
    )
  }
  // @ts-ignore
  if (!sectionConfig.component) {
    return (
      <Banner size="xs" error={true}>
        No section component found for name: ${section.name}
      </Banner>
    )
  }

  // @ts-ignore
  const theme = sectionConfig.theme ?? 'custom'
  // @ts-ignore
  const component = sectionConfig.component

  const info = JSON.stringify({
    id,
    name,
    slug,
    locale,
    section: {
      id: section.id,
      name: sectionConfig.name,
      label: sectionConfig.label,
      theme: theme,
    },
  })

  let data = {}
  if (section.fields) {
    data = { ...section.fields }
    if (section.blocks) {
      data = { ...data, blocks: [...section.blocks] }
    }
  }

  console.log('data', data)

  return (
    <section
      data-headcode-name={sectionConfig.name}
      data-headcode-theme={theme}
      data-headcode-info={info}
      data-vercel-edit-info={info}
    >
      {React.createElement(component, data)}
    </section>
  )
}

export default RenderSection
