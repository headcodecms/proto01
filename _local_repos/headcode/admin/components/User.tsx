'use client'

import {
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { DotPulse } from '@uiball/loaders'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { TABLES, table } from '../../utils/db'
import AuthService from '../../services/AuthService'

const User = ({ email, small }: { email?: string; small: boolean }) => {
  const router = useRouter()
  const [, , removeCookie] = useCookies([table(TABLES.roles)])
  const [userEmail, setUserEmail] = useState(email ?? '')
  const [loading, setLoading] = useState<boolean>(false)

  const updateEmail = async () => {
    const user = await AuthService.getUser()
    setUserEmail(user?.email ?? '')
    setLoading(false)
  }

  useEffect(() => {
    if (userEmail === '') {
      updateEmail()
    }
  }, [])

  const handleLogout = async () => {
    setLoading(true)
    await AuthService.signOut()
    removeCookie(table(TABLES.roles), { path: '/' })
    removeCookie(table('email'), { path: '/' })
    router.refresh()
  }

  return (
    <>
      <span
        className={clsx(
          small ? 'text-sm' : 'text-base',
          'flex items-center truncate px-2 py-2 text-sm font-medium text-gray-400'
        )}
      >
        <UserIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        {userEmail !== '' ? userEmail : <DotPulse size={32} color="#9ca3af" />}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className={clsx(
          small ? 'text-sm' : 'text-base',
          'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        )}
      >
        <ArrowRightOnRectangleIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        {loading ? <DotPulse size={32} color="#6b7280" /> : <span>Logout</span>}
      </button>
    </>
  )
}

export default User
