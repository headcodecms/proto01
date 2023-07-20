'use client'

import { useField } from 'formik'
import { FieldType, CheckboxValue } from '../types'

const render = ({ label, name, ...props }: { label: string; name: string }) => {
  const [field, meta] = useField({ ...props, name, type: 'checkbox' })

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
        {...field}
        {...props}
      />
      <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </label>
  )
}

const CheckboxField: FieldType<CheckboxValue> = {
  render,
  defaultValue: false,
}

export default CheckboxField
