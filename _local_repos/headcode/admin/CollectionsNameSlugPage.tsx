import Link from 'next/link'
import supabaseDb from '../services/supabase/supabaseDb'
import config from '@/headcode.config'
import { TYPE } from './components/Sections'
import EditSection from './components/EditSection'
import { parseData } from '../utils/parser'

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

  const dbService = supabaseDb(config.services.supabase)
  const data = await dbService.getSection(name, slug, locale)
  if (data?.length !== 1) {
    throw new Error(`Error getting collection data for ${name} ${slug} ${locale}`)
  }

  return (
    <>
      <div className="px-4 pb-4 sm:px-6 lg:px-8">
        <div>
          <Link
            href="/headcode/admin/collections"
            className="text-sm text-gray-400 hover:text-gray-500"
          >
            Collections
          </Link>
          <span className="px-2 text-sm text-gray-400">/</span>
          <Link
            href={`/headcode/admin/collections/${name}${localeParam}`}
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
      <EditSection
        data={data[0]}
        type={TYPE.collections}
        name={name}
        slug={slug}
        locale={locale}
        hasDelete={true}
      />
    </>
  )
}

export default CollectionNameSlugPage
