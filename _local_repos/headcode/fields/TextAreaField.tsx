'use client'

import { FieldType, TextValue } from '../types'

const render = ({
  form,
  label,
  name,
  ...props
}: {
  form: any
  label: string
  name: string
}) => {
  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      <div className="mt-1">
        <textarea
          id={name}
          rows={3}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...form.register(name)}
          {...props}
        />
      </div>
    </label>
  )
}

const TextAreaField: FieldType<TextValue> = {
  render,
  defaultValue: '',
}

export default TextAreaField
