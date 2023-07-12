import Banner from '../../ui/Banner';
import LinkList from './LinkList'
import config from '@/headcode.config'

export const TYPE = {
  globals: 'globals',
  collections: 'collections',
} as const

const Sections = ({ type, max }: { type: string; max?: number }) => {
  const props: any = {}
  const sectionConfigs =
    type === TYPE.globals ? config.globals : config.collections

  if (!sectionConfigs) {
    return <Banner size="sm">No {type} configured</Banner>
  }

  let links = sectionConfigs.map((item) => ({
    title: item.name,
    href: `/headcode/admin/${type}/${item.name}`,
    badge: item.metadata ? 'meta' : null,
    locales: item.locales ?? null,
  }))

  if (max && sectionConfigs.length > max) {
    props.href = '/headcode/admin/globals'
    links = links.slice(0, max)
  }

  return <LinkList links={links} {...props} />
}

export default Sections
