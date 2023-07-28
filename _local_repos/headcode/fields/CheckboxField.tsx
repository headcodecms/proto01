'use client'

import { FieldType, CheckboxValue } from '../types'

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
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
        {...form.register(name)}
        {...props}
      />
      <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
    </label>
  )
}

const CheckboxField: FieldType<CheckboxValue> = {
  render,
  defaultValue: false,
}

export default CheckboxField
