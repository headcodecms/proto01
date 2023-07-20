'use client'

import { useField } from 'formik'
import { FieldType, TextValue } from '../types'
import { useEffect } from 'react'

const render = ({
  label,
  name,
  ...props
}: {
  label: string
  name: string
  options: { label: string; value: string }[]
  defaultValue?: string
}) => {
  const { options, defaultValue, ...rest } = props
  const [field, meta, helpers] = useField({ ...rest, name })
  const { value } = meta
  const { setValue } = helpers

  useEffect(() => {
    if (defaultValue && value === SelectField.defaultValue) {
      setValue(defaultValue)
    }
  }, [value])

  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      <div className="mt-1">
        <select
          id={name}
          className="mt-1 block w-full max-w-xl rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
          {...field}
          {...rest}
        >
          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </label>
  )
}

const SelectField: FieldType<TextValue> = {
  render,
  defaultValue: '',
}

export default SelectField
