import Link from 'next/link'
import Image from 'next/image'
import { PlaceholderLogo } from '@headcode/client'

const Footer = ({
  logo = PlaceholderLogo,
  blocks = [
    {
      name: 'link',
      fields: {
        link: {
          url: '#',
          title: 'Link 1',
          newWindow: false,
        },
      },
    },
    {
      name: 'link',
      fields: {
        link: {
          url: '#',
          title: 'Link 2',
          newWindow: false,
        },
      },
    },
    {
      name: 'link',
      fields: {
        link: {
          url: '#',
          title: 'Link 3',
          newWindow: false,
        },
      },
    },
  ],
}: any) => {
  return (
    <div className="bg-gray-100 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <Link className="block" href="/">
            <Image
              className="h-8 w-auto"
              src={logo.url}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </Link>
        </div>
        <div className="my-5 flex items-center justify-center">
          <nav className="flex items-center space-x-5">
            {blocks?.map(
              (item: any, index: number) =>
                item.name === 'link' && (
                  <Link
                    key={index}
                    className="rounded-md px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                    href={item.fields.link.url}
                  >
                    {item.fields.link.title}
                  </Link>
                )
            )}
          </nav>
        </div>
        <div className="mt-16 text-xs text-gray-400">
          built with{' '}
          <a
            className="underline hover:text-gray-800"
            href="https://www.headcodecms.com"
          >
            Headcode CMS
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
