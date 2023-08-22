'use client'

import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction, useState } from 'react'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import { PlaceholderLogo } from '@headcode/client'

const Navigation = ({
  logo = PlaceholderLogo,
  cta = {
    url: '/login',
    title: 'Call to action',
    newWindow: false,
  },
  blocks = [
    {
      name: 'link',
      fields: {
        link: {
          url: '/#features',
          title: 'Features',
          newWindow: false,
        },
      },
    },
    {
      name: 'link',
      fields: {
        link: {
          url: '/blog',
          title: 'News',
          newWindow: false,
        },
      },
    },
    {
      name: 'link',
      fields: {
        link: {
          url: '/about',
          title: 'About',
          newWindow: false,
        },
      },
    },
  ],
}: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  return (
    <>
      <div className="py-6 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div className="flex items-center md:gap-x-12">
              <Link href="/">
                <Image
                  className="h-8 w-auto md:h-10"
                  src={logo.url}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                />
              </Link>
              <nav className="hidden md:flex md:gap-x-2">
                {blocks &&
                  blocks.map(
                    (item: any, index: number) =>
                      item.name === 'link' && (
                        <Link
                          key={index}
                          className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          href={item.fields.link.url}
                        >
                          {item.fields.link.title}
                        </Link>
                      )
                  )}
              </nav>
            </div>
            <div className="flex items-center gap-x-2 md:gap-x-8">
              {cta && (
                <Link
                  className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  href={cta.url}
                >
                  {cta.title}
                </Link>
              )}
              <div className="-mr-1 md:hidden">
                <button
                  type="button"
                  className="text-gray-350 inline-flex items-center justify-center rounded-md p-2.5"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
        logo={logo}
        cta={cta}
        blocks={blocks}
      />
    </>
  )
}

const MobileMenu = ({
  open,
  setOpen,
  logo,
  cta,
  blocks,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  logo: any
  cta: any
  blocks: any[]
}) => {
  return (
    <Dialog as="div" className="lg:hidden" open={open} onClose={setOpen}>
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 py-7 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <div>
            <Image
              className="h-8 w-auto md:h-10"
              src={logo.url}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </div>
          <button
            type="button"
            className="text-gray-350 rounded-md"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="space-y-2 py-6">
            <Link href="/" className="block leading-9 text-gray-600">
              Home
            </Link>
            {blocks &&
              blocks.map(
                (item: any, index: number) =>
                  item.name === 'link' && (
                    <Link
                      key={index}
                      className="block leading-9 text-gray-600"
                      href={item.fields.link.url}
                    >
                      {item.fields.link.title}
                    </Link>
                  )
              )}
          </div>
          <div className="mt-2">
            {cta && (
              <Link
                href={cta.url}
                className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                {cta.title}
              </Link>
            )}
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default Navigation
