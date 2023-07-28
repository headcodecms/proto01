'use client'

import { FieldType, TextValue } from '../types'

const render = ({
  form,
  label,
  name,
  ...props
}: {
  form: any
  error: any
  label: string
  name: string
}) => {
  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      <div className="mt-1">
        <input
          id={name}
          type="text"
          className="block max-w-xl w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...form.register(name)}
          {...props}
        />
      </div>
    </label>
  )
}

const TextField: FieldType<TextValue> = {
  render,
  defaultValue: ''
}

export default TextField
