import { RenderSection, SectionTypeConfig } from '../types'
import Banner from '../ui/Banner'
import { getCollectionConfig, getGlobalConfig } from '../utils/config'
import { DBService } from '@headcode/server'
import { getEmptySectionData } from '../utils/data'
import DefaultRenderer from './DefaultRenderer'
import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const getPresets = (config: SectionTypeConfig) => {
  if (!Array.isArray(config.presets)) return []
  return config.presets.map((item) =>
    getEmptySectionData(item.name, item.label)
  )
}

const Section = async ({
  name,
  slug,
  locale,
  localeFallback,
  renderer,
}: RenderSection) => {
  const config = slug ? getCollectionConfig(name) : getGlobalConfig(name)
  if (!config) return <InvalidConfigError name={name} slug={slug} />

  try {
    let data = await DBService.getSection(name, slug, locale)
    if (data.length === 0 && locale && localeFallback) {
      data = await DBService.getSection(name, slug, null)
    }

    const id = data.length === 1 ? data[0].id : null
    const sections: any[] =
      data.length === 1 ? data[0].data : getPresets(config)
    return React.createElement(renderer ?? DefaultRenderer, {
      id,
      name,
      slug,
      locale,
      config,
      sections,
    })
  } catch (error) {
    redirect('/headcode/setup')
  }
}

const InvalidConfigError = ({
  name,
  slug,
}: {
  name: string
  slug?: string | null
}) => {
  return (
    <Banner error={true} size="xs">
      {`No ${
        slug ? 'collection' : 'global'
      } with name: ${name} found in headcode.config`}
    </Banner>
  )
}

export default Section
