import { ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { SecondaryLink } from '../../ui/Buttons';
import Banner from '../../ui/Banner';

type Link = { title: string; href: string; badge?: string; locales?: string[] }

const LinkList = ({ links, href }: { links: Link[]; href?: string }) => {
  if (!links || links.length === 0) {
    return <Banner>No items found</Banner>
  }

  return (
    <>
      <nav className="flex-1 -ml-2 max-w-xl space-y-1">
        {links.map((item, index) => (
          <Fragment key={index}>
            <LinkItem item={item} />
            {item.locales && (
              <>
                {item.locales.map((locale, localeIndex) => (
                  <LinkItem key={localeIndex} item={item} locale={locale} />
                ))}
              </>
            )}
          </Fragment>
        ))}
      </nav>
      {href && (
        <div className="py-4">
          <SecondaryLink href={href}>View all</SecondaryLink>
        </div>
      )}
    </>
  )
}

const LinkItem = ({ item, locale }: { item: Link; locale?: string }) => (
  <a
    href={locale ? `${item.href}?locale=${locale}` : item.href}
    className={clsx(
      'text-base group flex items-center justify-between text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 px-2 py-1.5 font-medium rounded-md',
      locale ? 'ml-4' : ''
    )}
  >
    <div className="flex items-center space-x-3">
      <span>{item.title}</span>
      {item.badge && (
        <span className="uppercase text-xs border border-gray-300 px-1.5 text-gray-400 py-0.5 rounded">
          {item.badge}
        </span>
      )}
      {locale && (
        <span className="uppercase text-xs border border-gray-300 px-1.5 text-gray-400 py-0.5 rounded">
          {locale}
        </span>
      )}
    </div>
    <span className="opacity-0 group-hover:opacity-100 text-gray-400">
      <ChevronRightIcon className="mr-3 flex-shrink-0 h-4 w-4" />
    </span>
  </a>
)

export default LinkList
