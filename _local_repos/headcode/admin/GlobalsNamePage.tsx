import Link from 'next/link'
import supabaseDb from '../services/supabase/supabaseDb'
import config from '@/headcode.config'
import Editor from './components/editor/Editor'
import { getDefaultSection } from '../utils/config'

const GlobalsNamePage = async ({
  params,
  searchParams,
}: {
  params: { name: string }
  searchParams: { locale?: string }
}) => {
  const { name } = params
  const locale = searchParams.locale
  const localeParam = locale ? `?locale=${locale}` : ''

  const dbService = supabaseDb(config.services.supabase)
  const data = await dbService.getSection(name, undefined, locale)
  if (!data) {
    throw new Error(`Error getting global data for ${name} ${locale}`)
  }

  return (
    <>
      <div className="px-4 pb-4 sm:px-6 lg:px-8">
        <div>
          <Link
            href="/headcode/admin/globals"
            className="text-sm text-gray-400 hover:text-gray-500"
          >
            Globals
          </Link>
        </div>
        <h1 className="flex items-center space-x-2 text-2xl font-semibold text-gray-900">
          <span>{name}</span>
          {locale && (
            <span className="rounded border border-gray-300 px-1.5 py-0.5 text-xs uppercase text-gray-400">
              {locale}
            </span>
          )}
        </h1>
      </div>
      <Editor
        storedData={
          data.length === 1
            ? data[0]
            : getDefaultSection(name, undefined, locale)
        }
        name={name}
        locale={locale}
      />
    </>
  )
}

export default GlobalsNamePage
