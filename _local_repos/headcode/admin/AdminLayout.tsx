import Nav from './components/Nav'
import Sidebar from './components/Sidebar'
import User from './components/User'
import config from '@/headcode.config'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { table } from '../utils/db'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies()
  const email = cookieStore.get(table('email'))?.value

  return (
    <div className="mx-auto max-w-7xl px-0 lg:px-4">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-8">
          <div className="px-4">
            <Link
              href="/headcode/admin/dashboard"
              className="text-base font-medium uppercase text-gray-900"
            >
              Headcode
            </Link>
            <Version />
          </div>
          <div className="mt-8 flex flex-grow flex-col">
            <Nav small={true} />
          </div>
          <div className="border-t border-gray-200 py-4 pr-4">
            <User email={email} small={true} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow lg:hidden">
          <Sidebar />
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1 items-center">
              <Link
                href="/headcode/admin/dashboard"
                className="text-base font-medium uppercase text-gray-900"
              >
                Headcode
              </Link>
            </div>
            <div className="ml-4 flex items-center lg:ml-6">
              <Version />
            </div>
          </div>
        </div>

        <main>
          <div className="py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

const Version = () => (
  <div className="mt-2 flex items-center space-x-2">
    <IconVersion className="h-6 w-6 text-gray-300" />
    <span className="text-sm text-gray-400">{config.version}</span>
  </div>
)

const IconVersion = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435ZM8.75 6v1c.14.301.338.617.588.95.537.716 1.259 1.44 2.016 2.196l-.708.708-.015-.016c-.652-.652-1.33-1.33-1.881-2.015V12h-1.5V6H6.034a.25.25 0 0 1-.192-.41l1.966-2.36a.25.25 0 0 1 .384 0l1.966 2.36a.25.25 0 0 1-.192.41H8.75Z" />
  </svg>
)

export default Layout
