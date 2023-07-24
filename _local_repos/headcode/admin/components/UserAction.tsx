'use client'

import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import AuthService from '../../services/AuthService'
import { useCookies } from 'react-cookie'
import { ROLES, TABLES, table } from '../../utils/db'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { handleSetRole } from '../actions/RolesAction'

const UserAction = ({ user }: any) => {
  const [userId, setUserId] = useState('')
  const [cookies] = useCookies()
  const [show, setShow] = useState<boolean>(false)
  const path = '/headcode/admin/users'

  const updateUserId = async () => {
    const newUser = await AuthService.getUser()
    setUserId(newUser?.id ?? '')
  }

  useEffect(() => {
    updateUserId()
  }, [])

  useEffect(() => {
    if (userId !== '' && user.user_id !== userId) {
      const key = table(TABLES.roles)
      if (cookies && cookies.hasOwnProperty(key)) {
        setShow(cookies[key] === 'admin')
      }
    }
  }, [userId, cookies])

  if (!show) {
    return <div className="h-7 w-12"></div>
  }

  return (
    <form>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className=" rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {user.role === ROLES.editor ? (
                <div className="flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-400">
                  Editor
                </div>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      formAction={() =>
                        handleSetRole(user.id, ROLES.editor, path)
                      }
                      className={`${
                        active ? 'bg-gray-50 text-gray-900' : 'text-gray-600'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Editor
                    </button>
                  )}
                </Menu.Item>
              )}
              {user.role === ROLES.admin ? (
                <div className="flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-400">
                  Admin
                </div>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      formAction={() =>
                        handleSetRole(user.id, ROLES.admin, path)
                      }
                      className={`${
                        active ? 'bg-gray-50 text-gray-900' : 'text-gray-600'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Admin
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
            <div className="px-1 py-1">
              {user.role === ROLES.rejected ? (
                <div className="flex w-full items-center rounded-md px-2 py-2 text-sm text-red-400">
                  Rejected
                </div>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      formAction={() =>
                        handleSetRole(user.id, ROLES.rejected, path)
                      }
                      className={`${
                        active ? 'bg-red-50 text-red-900' : 'text-red-700'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Reject
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </form>
  )
}

export default UserAction
