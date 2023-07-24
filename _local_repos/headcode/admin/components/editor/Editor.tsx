'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { getSectionConfig } from '../../../utils/config'
import { getNavId, parseData } from '../../../utils/parser'
import {
  getUpdatedBlocksData,
  getUpdatedFieldsData,
  sortListByList,
} from '../../../utils/data'
import { saveSection } from '../../actions/SectionsAction'
import { showToastMessage } from '../../../ui/Toast'
import MetaEdit from './MetaEdit'
import MetaPreview from './MetaPreview'
import TagsEdit from './TagsEdit'
import { Data, EditorNav, Section, SortableListItem } from '../../../types'
import FieldsEdit from './FieldsEdit'
import ActionBar from './ActionBar'
import BlocksList from './BlocksList'
import SectionList from './SectionList'

const Editor = ({
  storedData,
  name,
  slug,
  locale,
  hasDelete,
}: {
  storedData: Section
  name: string
  slug?: string
  locale?: string
  hasDelete?: boolean
}) => {
  const router = useRouter()
  const localeParam = locale ? `?locale=${locale}` : ''
  const sectionConfig = getSectionConfig(name)
  const parsedData = parseData(storedData, name)

  const [nav, setNav] = useState<EditorNav>({
    hasSections: sectionConfig.limit > 1,
    meta: false,
    section: sectionConfig.limit === 1 ? parsedData.data[0]?.id : null,
    blocks: [],
  })

  const [metaSubmit, setMetaSubmit] = useState(false)
  const [fieldsSubmit, setFieldsSubmit] = useState(false)

  const [data, setData] = useState<any>(parsedData)
  const [saving, setSaving] = useState(false)

  const isRootNav = () => {
    if (nav.hasSections) {
      return nav.section === null && !nav.meta
    }

    return nav.blocks.length === 0 && !nav.meta
  }

  const showMetaPreview = () => {
    return isRootNav() && sectionConfig.metadata
  }

  const showSectionList = () => {
    return isRootNav() && nav.hasSections
  }

  const handleSave = () => {
    if (nav.meta) {
      setMetaSubmit(true)
    }
    if (nav.section) {
      setFieldsSubmit(true)
    }
  }

  const handleMetaEdit = () => {
    setMetaSubmit(false)
    setNav({ ...nav, meta: true })
  }

  const handleMetaSubmit = async (values: any) => {
    const newData = { ...data, meta: values }
    if (metaSubmit) {
      await saveData(newData)
    } else {
      setNav({ ...nav, meta: false })
    }

    setData(newData)
  }

  const handleFieldsSubmit = async (id: string, values: any) => {
    const newData = {
      ...data,
      data: getUpdatedFieldsData(data.data, id, values),
    }
    if (fieldsSubmit) {
      await saveData(newData)
    } else {
      if (nav.blocks.length > 0) {
        const newBlocks = [...nav.blocks]
        newBlocks.pop()
        setNav({ ...nav, blocks: newBlocks })
      } else if (nav.hasSections && nav.section) {
        setNav({ ...nav, section: null })
      }
    }

    setData(newData)
  }

  const saveData = async (newData: Section) => {
    setSaving(true)
    // @ts-ignore
    await saveSection(newData)

    setMetaSubmit(false)
    setFieldsSubmit(false)
    setSaving(false)

    showToastMessage(`${slug ?? name} saved successful`)
  }

  const handleUpdateTags = (newTags: string[]) => {
    setData({ ...data, tags: newTags })
  }

  const handleSectionListUpdate = (list: SortableListItem[]) => {
    const newSections = sortListByList(data.data, list)
    const newData = { ...data, data: newSections }

    setData(newData)
  }

  const handleSectionItemAdd = (newSections: Data[]) => {
    const newData = { ...data, data: newSections }
    setData(newData)
  }

  const handleSectionItemSelected = (item: SortableListItem) => {
    setNav({
      ...nav,
      meta: false,
      section: { id: item.id, label: item.label },
      blocks: [],
    })
  }

  const handleBlocksListUpdate = (list: SortableListItem[], values: Data) => {
    if (Array.isArray(values.blocks)) {
      const id = values.id
      const newBlocks = sortListByList(values.blocks, list)
      const newData = {
        ...data,
        data: getUpdatedBlocksData(data.data, id, newBlocks),
      }
      setData(newData)
    }
  }

  const handleBlocksItemAdd = (values: Data) => {
    if (Array.isArray(values.blocks)) {
      const id = values.id
      const newData = {
        ...data,
        data: getUpdatedBlocksData(data.data, id, values.blocks),
      }
      setData(newData)
    }
  }

  const handleBlocksItemSelected = (item: SortableListItem) => {
    const newBlocks = [...nav.blocks, { id: item.id, label: item.label }]
    setNav({ ...nav, meta: false, blocks: newBlocks })
  }

  console.log('editsection', nav, data, sectionConfig)

  return (
    <>
      <div className="space-y-8 px-4 pb-4 sm:px-6 lg:px-8">
        {showMetaPreview() && (
          <MetaPreview values={data.meta} handleMetaEdit={handleMetaEdit} />
        )}
        {nav.meta && (
          <MetaEdit
            values={data.meta}
            handleMetaSubmit={handleMetaSubmit}
            metaSubmit={metaSubmit}
          />
        )}
        {isRootNav() && (
          <TagsEdit tags={data.tags} handleUpdateTags={handleUpdateTags} />
        )}
        {showSectionList() && (
          <SectionList
            key={`sections-${getNavId(nav)}`}
            data={data.data}
            config={sectionConfig}
            nav={nav}
            handleListUpdate={handleSectionListUpdate}
            handleItemAdd={handleSectionItemAdd}
            handleItemSelected={handleSectionItemSelected}
          />
        )}
        {nav.section && (
          <>
            <FieldsEdit
              key={`fields-${getNavId(nav)}`}
              data={data.data}
              config={sectionConfig}
              nav={nav}
              fieldsSubmit={fieldsSubmit}
              handleFieldsSubmit={handleFieldsSubmit}
            />
            <BlocksList
              key={`blocks-${getNavId(nav)}`}
              data={data.data}
              config={sectionConfig}
              nav={nav}
              handleListUpdate={handleBlocksListUpdate}
              handleItemAdd={handleBlocksItemAdd}
              handleItemSelected={handleBlocksItemSelected}
            />
          </>
        )}
      </div>
      <ActionBar handleSave={handleSave} saving={saving} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  )
}

export default Editor
