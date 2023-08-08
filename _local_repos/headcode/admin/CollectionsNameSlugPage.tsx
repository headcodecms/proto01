import Link from 'next/link'
import Editor from './components/editor/Editor'
import DBService from '../services/DBService'
import { useRouter } from 'next/navigation'

const CollectionNameSlugPage = async ({
  params,
  searchParams,
}: {
  params: { name: string; slug: string }
  searchParams: { locale?: string }
}) => {
  const { name, slug } = params
  const locale = searchParams.locale
  const localeParam = locale ? `?locale=${locale}` : ''
  const backLink = `/headcode/admin/collections/${name}${localeParam}`

  const data = await DBService.getSection(name, slug, locale)
  if (data?.length !== 1) {
    throw new Error(
      `Error getting collection data for ${name} ${slug} ${locale}`
    )
  }

  return (
    <>
      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <div>
          <Link
            href="/headcode/admin/collections"
            className="text-sm text-gray-400 hover:text-gray-500"
          >
            Collections
          </Link>
          <span className="px-2 text-sm text-gray-400">/</span>
          <Link
            href={backLink}
            className="text-sm text-gray-400 hover:text-gray-500"
          >
            {name}
          </Link>
        </div>
        <h1 className="flex items-center space-x-2 text-2xl font-semibold text-gray-900">
          <span>{slug}</span>
          {locale && (
            <span className="rounded border border-gray-300 px-1.5 py-0.5 text-xs uppercase text-gray-400">
              {locale}
            </span>
          )}
        </h1>
      </div>
      <Editor
        storedData={data[0]}
        name={name}
        slug={slug}
        locale={locale}
        handleCancel={backLink}
      />
    </>
  )
}

export default CollectionNameSlugPage
