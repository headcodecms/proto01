import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import Banner from './Banner'
import { SecondaryMenuButton } from './Buttons'
import { Menu, Transition } from '@headlessui/react'
import { SortableListItem, SortableListMenuItem } from '../types'

const SortableList = ({
  title,
  list,
  menu,
  handleListUpdate,
  handleItemAdd,
  handleItemSelected,
}: {
  title: string
  list: SortableListItem[]
  menu: SortableListMenuItem[]
  handleListUpdate: any
  handleItemAdd: any
  handleItemSelected: any
}) => {
  return (
    <div>
      <h3 className="pb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <div className="my-1">
        {list && list.length > 0 ? (
          <ReactSortable
            className="-ml-2 max-w-xl flex-1 space-y-1"
            list={list}
            setList={handleListUpdate}
          >
            {list.map((item: any) => (
              <a
                key={item.id}
                onClick={(e) => {
                  e.preventDefault()
                  handleItemSelected(item)
                }}
                className="group flex items-center justify-between rounded-md bg-gray-100 px-2 py-1.5 text-base font-medium text-gray-500 hover:cursor-pointer hover:bg-gray-200 hover:text-gray-900"
              >
                <div className="flex items-center space-x-1">
                  <span className="text-gray-400 hover:cursor-grab group-hover:text-gray-600">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </span>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100">
                  <span className="pr-4 text-xs font-light">{`***${item.id.substring(
                    item.id.length - 5
                  )}`}</span>
                  <ChevronRightIcon className="mr-3 h-4 w-4 flex-shrink-0" />
                </div>
              </a>
            ))}
          </ReactSortable>
        ) : (
          <div className="max-w-xl">
            <Banner size="sm">No {title} found</Banner>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <SecondaryMenuButton>Add</SecondaryMenuButton>
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
            <Menu.Items className="absolute bottom-11 left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {menu.map((item: any) => (
                  <Menu.Item key={item.name}>
                    <button
                      className="flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                      onClick={() => handleItemAdd(item)}
                    >
                      {item.label}
                    </button>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}

export default SortableList
