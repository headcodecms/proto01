import React from 'react'
import { SectionConfig, SectionTypeConfig, VisualEditingInfo } from '../types'
import Banner from '../ui/Banner'
import { findMatchingConfig } from '../utils/config'
import VisualEditingButton from '../visualediting/VisualEditingButton'

const RenderSection = ({
  id,
  name,
  slug,
  locale,
  section,
  config,
  visualediting,
}: {
  id: string | null
  name: string
  slug?: string | null
  locale?: string | null
  section: any
  config: SectionTypeConfig
  visualediting?: boolean
}) => {
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
      },
    },
  }

  let data = {}
  if (section.fields) {
    data = { ...section.fields }
    if (section.blocks) {
      data = { ...data, blocks: [...section.blocks] }
    }
  }

  return (
    <section
      className="group relative"
      data-headcode-name={sectionConfig.name}
      data-headcode-theme={theme}
      data-vercel-edit-info={JSON.stringify(info)}
    >
      {visualediting && (
        <VisualEditingButton info={info}>
          Edit {name} / {sectionConfig.label}
        </VisualEditingButton>
      )}
      {React.createElement(component, data)}
    </section>
  )
}

export default RenderSection
