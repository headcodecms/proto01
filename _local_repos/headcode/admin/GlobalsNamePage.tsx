import Link from 'next/link'
import Editor from './components/editor/Editor'
import { getDefaultSection } from '../utils/config'
import DBService from '../services/DBService'
import { useRouter } from 'next/navigation'

const GlobalsNamePage = async ({
  params,
  searchParams,
}: {
  params: { name: string }
  searchParams: { locale?: string }
}) => {
  const { name } = params
  const locale = searchParams.locale
  const backLink = '/headcode/admin/globals'

  const data = await DBService.getSection(name, undefined, locale)
  if (!data) {
    throw new Error(`Error getting global data for ${name} ${locale}`)
  }

  return (
    <>
      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <div>
          <Link
            href={backLink}
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
        handleCancel={backLink}
      />
    </>
  )
}

export default GlobalsNamePage
