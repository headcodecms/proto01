import Link from 'next/link'
import config from '@/headcode.config'
import LinkList from './components/LinkList'
import AddCollection from './components/AddCollection'
import DBService from '../services/DBService'

const CollectionNamePage = async ({
  params,
  searchParams,
}: {
  params: { name: string }
  searchParams: { locale?: string }
}) => {
  const { name } = params
  const locale = searchParams.locale
  const localeParam = locale ? `?locale=${locale}` : ''

  const collectionConfig = config.collections?.find(
    (item) => item.name === name
  )

  const data = await DBService.getCollections(name, searchParams.locale)

  let links = data.map((item) => ({
    title: item.slug,
    href: `/headcode/admin/collections/${item.name}/${item.slug}${localeParam}`,
  }))

  return (
    <div className="max-w-xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <div>
            <Link
              href="/headcode/admin/collections"
              className="text-sm text-gray-400 hover:text-gray-500"
            >
              Collections
            </Link>
          </div>
          <h1 className="flex items-center space-x-2 text-2xl font-semibold text-gray-900">
            <span>{name}</span>
            {collectionConfig?.metadata && (
              <span className="rounded border border-gray-300 px-1.5 py-0.5 text-xs uppercase text-gray-400">
                meta
              </span>
            )}
            {locale && (
              <span className="rounded border border-gray-300 px-1.5 py-0.5 text-xs uppercase text-gray-400">
                {locale}
              </span>
            )}
          </h1>
        </div>
        <div>
          <AddCollection name={name} locale={locale} data={data} />
        </div>
      </div>
      <div className="py-6">
        <LinkList links={links} />
      </div>
    </div>
  )
}

export default CollectionNamePage
