'use client'

import {
  HomeIcon,
  UsersIcon,
  PhotoIcon,
  StopIcon,
  Square2StackIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export const navigation = [
  {
    name: 'Dashboard',
    href: '/headcode/admin/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Globals',
    href: '/headcode/admin/globals',
    icon: StopIcon,
  },
  {
    name: 'Collections',
    href: '/headcode/admin/collections',
    icon: Square2StackIcon,
  },
  { name: 'Media', href: '#', icon: PhotoIcon },
  { name: 'Users', href: '/headcode/admin/users', icon: UsersIcon },
]

const Nav = ({ small }: { small: boolean }) => {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-1 px-2 pb-4">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={clsx(
            small ? 'text-sm' : 'text-base',
            pathname.startsWith(item.href)
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center px-2 py-2 font-medium rounded-md'
          )}
        >
          <item.icon
            className={clsx(
              pathname.startsWith(item.href)
                ? 'text-gray-500'
                : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 flex-shrink-0 h-6 w-6'
            )}
            aria-hidden="true"
          />
          {item.name}
        </a>
      ))}
    </nav>
  )
}

export default Nav
