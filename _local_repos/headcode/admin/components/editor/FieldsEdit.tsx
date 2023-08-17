import {
  Data,
  EditorNav,
  SectionTypeConfig,
  SortableListItem,
} from '../../../types'
import Banner from '../../../ui/Banner'
import { findData } from '../../../utils/data'
import { findMatchingConfig } from '../../../utils/config'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import { getNavId } from '../../../utils/parser'
import { SubmitHandler, useForm } from 'react-hook-form'

const FieldsEdit = ({
  data,
  config,
  nav,
  fieldsSubmit,
  fieldsUpdate,
  handleFieldsSubmit,
  updateDirty,
}: {
  data: Data[]
  config: SectionTypeConfig
  nav: EditorNav
  fieldsSubmit: boolean
  fieldsUpdate: SortableListItem | null
  handleFieldsSubmit: any
  updateDirty: any
}) => {
  // TODO: Improve error handling, TypeScript support
  const id = getNavId(nav)
  const values = findData(data, id)
  const sectionConfig = findMatchingConfig(values?.name ?? '', config.sections)
  const fields: any = sectionConfig?.fields

  const form = useForm<any>({
    defaultValues: values?.fields ?? {},
  })

  useEffect(() => {
    if (fieldsSubmit || fieldsUpdate) {
      executeFieldsSubmit(form.getValues())
    }
  }, [fieldsSubmit, fieldsUpdate])

  const executeFieldsSubmit: SubmitHandler<any> = async (fieldsData) => {
    await handleFieldsSubmit(id, fieldsData)
  }

  const showBack = () => {
    return nav.hasSections || nav.blocks.length > 0
  }

  if (!values || !sectionConfig) {
    return <Banner size="sm">No section values found!</Banner>
  }

  return (
    <form onSubmit={form.handleSubmit(executeFieldsSubmit)}>
      <div className="mb-4 flex items-center space-x-2">
        {showBack() && (
          <button type="submit">
            <ArrowLeftIcon className="h-8 w-8 rounded-md bg-gray-200 p-1.5 text-white hover:bg-gray-300" />
          </button>
        )}
        <div>
          <NavBreadcrumbs nav={nav} />
          <h3 className="text-lg font-semibold text-gray-900">
            {values.label}
          </h3>
        </div>
      </div>
      <div className="space-y-4">
        {Object.keys(fields).map((key, index) => {
          const field = fields[key]
          const { label, type, ...rest } = field
          const values = {
            form,
            label: field.label,
            name: key,
            ...rest,
          }

          return (
            <div key={index}>
              {React.createElement(field.type.render, values)}
            </div>
          )
        })}
      </div>
    </form>
  )
}

const NavBreadcrumbs = ({ nav }: { nav: EditorNav }) => {
  if (nav.blocks.length === 0) {
    return null
  }

  return (
    <div className="-mb-2">
      <span className="text-xs text-gray-400">{nav.section?.label}</span>
      {nav.blocks.map((item, index) =>
        index < nav.blocks.length - 1 ? (
          <span key={index}>
            <span className="px-1 text-xs text-gray-400">/</span>
            <span className="text-xs text-gray-400">{item.label}</span>
          </span>
        ) : null
      )}
    </div>
  )
}

export default FieldsEdit
