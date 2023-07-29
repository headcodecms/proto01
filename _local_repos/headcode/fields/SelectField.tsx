'use client'

import { useEffect } from 'react'
import { FieldType, SelectFieldComponent, TextValue } from '../types'

const render = ({
  form,
  label,
  name,
  options,
  defaultValue,
}: SelectFieldComponent) => {
  useEffect(() => {
    const value = form.getValues(name)
    if (defaultValue && value === SelectField.defaultValue) {
      form.setValue(name, defaultValue)
    }
  }, [form])

  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      <div className="mt-1">
        <select
          id={name}
          className="mt-1 block w-full max-w-xl rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
          {...form.register(name)}
        >
          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}

const SelectField: FieldType<TextValue, SelectFieldComponent> = {
  render,
  defaultValue: '',
}

export default SelectField
