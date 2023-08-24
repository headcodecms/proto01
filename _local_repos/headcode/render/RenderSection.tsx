import React, { Suspense } from 'react'
import { SectionConfig, SectionTypeConfig, VisualEditingInfo } from '../types'
import Banner from '../ui/Banner'
import { findMatchingConfig } from '../utils/config'
import VisualEditingButton from '../visualediting/VisualEditingButton'
import { parseBlocks, parseFields } from '../utils/parser'

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
  const isEditable = process.env.NODE_ENV === 'development'
  const sectionConfig = findMatchingConfig<SectionConfig>(
    section.name,
    config.sections
  )

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

  const info: VisualEditingInfo = {
    origin: 'headcodecms.com',
    data: {
      id,
      name,
      slug,
      locale,
      section: {
        id: section.id,
        name: sectionConfig.name,
        label: sectionConfig.label,
      },
    },
  }

  let data = {}
  if (section.fields) {
    data = parseFields(section.fields, sectionConfig.fields)
    if (section.blocks) {
      data = {
        ...data,
        blocks: parseBlocks(section.blocks, sectionConfig.blocks),
      }
    }
  }

  return (
    <section
      className="group relative"
      data-headcode-name={sectionConfig.name}
      data-headcode-theme={theme}
      data-vercel-edit-info={JSON.stringify(info)}
    >
      {isEditable && (
        <VisualEditingButton info={info}>
          Edit {name} / {sectionConfig.label}
        </VisualEditingButton>
      )}
      {React.createElement(component, data)}
    </section>
  )
}

export default RenderSection
