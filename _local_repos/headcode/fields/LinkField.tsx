'use client'

import { useState } from 'react'
import { FieldComponent, FieldType, LinkValue } from '../types'

const render = ({ form, label, name }: FieldComponent) => {
  const [link, setLink] = useState<LinkValue>(form.getValues(name))

  const handleUpdate = (newLink: LinkValue) => {
    setLink(newLink)
    form.setValue(name, newLink)
  }

  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <input
            id={name}
            type="text"
            placeholder="URL"
            className="block w-full max-w-xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={link.url}
            onChange={(e) => handleUpdate({ ...link, url: e.currentTarget.value })}
          />
        </div>
        <div>
          <input
            id={`${name}__title`}
            type="text"
            placeholder="Title"
            className="block w-full max-w-xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={link.title}
            onChange={(e) => handleUpdate({ ...link, title: e.currentTarget.value })}
          />
        </div>
      </div>
      <label className="mt-2 inline-flex items-center md:col-span-2">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
          checked={link.newWindow}
          onChange={() => handleUpdate({ ...link, newWindow: !link.newWindow })}
        />
        <span className="ml-2 text-sm font-medium text-gray-700">
          Open in new window
        </span>
      </label>
    </>
  )
}

const LinkField: FieldType<LinkValue, FieldComponent> = {
  render,
  defaultValue: {
    url: '',
    title: '',
    newWindow: false,
  },
}

export default LinkField
