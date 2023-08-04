import { SectionTypeConfig } from '../types'
import { getPrevSectionValue } from '../utils/render'
import RenderSection from './RenderSection'

const DefaultRenderer = ({
  id,
  name,
  slug,
  locale,
  config,
  sections,
  visualediting,
}: {
  id: string | null
  name: string
  slug?: string | null
  locale?: string | null
  config: SectionTypeConfig
  sections: any[]
  visualediting?: boolean
}) => {
  return sections.map((section, index) => {
    const prevValue = getPrevSectionValue(sections, index, 'img', 'default')

    return (
      <div className="bg-gray-200">
        <RenderSection
          id={id}
          name={name}
          slug={slug}
          locale={locale}
          section={section}
          config={config}
          visualediting={visualediting}
        />
      </div>
    )
  })
}

export default DefaultRenderer
