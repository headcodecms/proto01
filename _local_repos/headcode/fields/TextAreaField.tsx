'use client'

import { useField } from 'formik'
import { FieldType, TextValue } from '../types'

const render = ({ label, name, ...props }: { label: string; name: string }) => {
  const [field, meta] = useField({ ...props, name })

  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      <div className="mt-1">
        <textarea
          id={name}
          rows={3}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </label>
  )
}

const TextAreaField: FieldType<TextValue> = {
  render,
  defaultValue: '',
}

export default TextAreaField
