'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { getSectionConfig } from '../../../utils/config'
import { getNavId, parseData } from '../../../utils/parser'
import {
  getUpdatedBlocksData,
  getUpdatedFieldsData,
  removeFromData,
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
import deepEqual from 'deep-equal'

const Editor = ({
  storedData,
  name,
  slug,
  locale,
  backLink,
}: {
  storedData: Section
  name: string
  slug?: string
  locale?: string
  backLink?: string
}) => {
  const router = useRouter()
  const sectionConfig = getSectionConfig(name)
  const parsedData = parseData(storedData, name)

  const [nav, setNav] = useState<EditorNav>({
    hasSections: sectionConfig.limit > 1,
    meta: false,
    section:
      sectionConfig.limit === 1
        ? {
            id: parsedData.data[0]?.id ?? '',
            label: parsedData.data[0]?.label ?? '',
          }
        : null,
    blocks: [],
  })

  const [metaSubmit, setMetaSubmit] = useState<boolean>(false)
  const [fieldsSubmit, setFieldsSubmit] = useState<boolean>(false)
  const [fieldsUpdate, setFieldsUpdate] = useState<SortableListItem | null>(
    null
  )

  const [data, setData] = useState<any>(parsedData)
  const [saving, setSaving] = useState(false)

  const [dataDirty, setDataDirty] = useState<boolean>(false)
  const [metaDirty, setMetaDirty] = useState<boolean>(false)
  const [fieldsDirty, setFieldsDirty] = useState<boolean>(false)

  useEffect(() => {
    const equal = deepEqual(parsedData, data)
    setDataDirty(!equal)
  }, [data])

  const isRootNav = () => {
    if (nav.hasSections) {
      return nav.section === null && !nav.meta
    }

    return nav.blocks.length === 0 && !nav.meta
  }

  const isDirty = () => dataDirty || metaDirty || fieldsDirty

  const showMetaPreview = () => {
    return isRootNav() && sectionConfig.metadata
  }

  const showSectionList = () => {
    return isRootNav() && nav.hasSections
  }

  const handleCancel = () => {
    if (backLink) {
      router.push(backLink)
    }
  }

  const navBack = () => {
    if (nav.blocks.length > 0) {
      const newBlocks = [...nav.blocks]
      newBlocks.pop()
      setNav({ ...nav, blocks: newBlocks })
    } else if (nav.hasSections && nav.section) {
      setNav({ ...nav, section: null })
    }
  }

  const handleDelete = () => {
    const id = getNavId(nav)
    if (id) {
      const newData = removeFromData(data.data, id)
      setData({ ...data, data: newData })
      navBack()
    }
  }

  const getDeleteTitle = () => {
    if (nav.section) {
      if (nav.blocks.length === 0) {
        return nav.hasSections ? 'Delete Section' : null
      } else {
        return 'Delete Block'
      }
    }

    return null
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

    setMetaDirty(false)
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
      if (fieldsUpdate) {
        const newBlocks = [
          ...nav.blocks,
          { id: fieldsUpdate.id, label: fieldsUpdate.label },
        ]
        setNav({ ...nav, meta: false, blocks: newBlocks })
      } else {
        navBack()
      }
      setFieldsUpdate(null)
    }

    setFieldsDirty(false)
    setData(newData)
  }

  const saveData = async (newData: Section) => {
    setSaving(true)
    // @ts-ignore
    await saveSection(newData)

    setMetaSubmit(false)
    setFieldsSubmit(false)
    setFieldsUpdate(null)
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
    setFieldsUpdate(item)
  }

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
            updateDirty={setMetaDirty}
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
              fieldsUpdate={fieldsUpdate}
              handleFieldsSubmit={handleFieldsSubmit}
              updateDirty={setFieldsDirty}
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
      <ActionBar
        handleSave={handleSave}
        saving={saving}
        dirty={isDirty()}
        handleCancel={handleCancel}
        deleteTitle={getDeleteTitle()}
        handleDelete={handleDelete}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  )
}

export default Editor
