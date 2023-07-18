'use client'

import { useState } from 'react'
import {
  PrimaryButton,
  SecondaryButton,
  SecondaryDangerButton,
} from '../../../ui/Buttons'
import ConfirmationDialog from '../../../ui/ConfirmationDialog'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import {
  getSectionConfig,
  getSectionListData,
  sortListByList,
} from '../../../utils/config'
import {
  findData,
  findMatchingConfig,
  getDefaultSectionData,
  parseData,
} from '../../../utils/parser'
import { saveSection } from '../../actions/SectionsAction'
import { showToastMessage } from '../../../ui/Toast'
import MetaEdit from './MetaEdit'
import MetaPreview from './MetaPreview'
import SortableList from '../../../ui/SortableList'
import TagsEdit from './TagsEdit'
import {
  Data,
  EditorNav,
  Section,
  SectionConfig,
  SortableListItem,
  SortableListMenuItem,
} from '../../../types'

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
  const parsedSectionList =
    // @ts-ignore
    sectionConfig.limit > 1 ? getSectionListData(parsedData.data) : []

  const [nav, setNav] = useState<EditorNav>({
    hasSections: sectionConfig.limit > 1,
    meta: false,
    section: sectionConfig.limit === 1 ? parsedData.data[0]?.id : null,
    blocks: [],
  })

  const [metaSubmit, setMetaSubmit] = useState(false)

  const [sectionList, setSectionList] = useState(parsedSectionList)
  const sectionListMenu = Array.isArray(sectionConfig.sections)
    ? sectionConfig.sections.map((item: SectionConfig) => ({
        name: item.name,
        label: item.label,
      }))
    : []

  const [blocksList, setBlocksList] = useState([
    { id: '123', name: 'herosection', label: 'Hero Section' },
    { id: '124', name: 'herosection2', label: 'Hero Section 2' },
  ])
  const [blocksListMenu, setBlocksListMenu] = useState([
    {
      name: 'newitem',
      label: 'New Item',
    },
    {
      name: 'newitem2',
      label: 'New Item 2',
    },
  ])

  const [data, setData] = useState(parsedData)
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

  const isSectionNav = () => {
    return nav.section && nav.blocks.length === 0
  }

  const handleSave = () => {
    console.log('handle save')
    if (nav.meta) {
      setMetaSubmit(true)
    }
  }

  const handleMetaEdit = () => {
    setMetaSubmit(false)
    setNav({ ...nav, meta: true })
  }

  const handleMetaSubmit = async (values: any) => {
    const newData = { ...data, meta: values }
    if (metaSubmit) {
      setSaving(true)
      // @ts-ignore
      await saveSection(newData)

      setMetaSubmit(false)
      setSaving(false)
      showToastMessage(`${slug ?? name} saved successful`)
    } else {
      setNav({ ...nav, meta: false })
    }

    setData(newData)
  }

  const handleUpdateTags = (newTags: string[]) => {
    setData({ ...data, tags: newTags })
  }

  const handleSectionListUpdate = (list: SortableListItem[]) => {
    // @ts-ignore
    const newSections = sortListByList(data.data, list)
    const newData = { ...data, data: newSections }

    // @ts-ignore
    setData(newData)
    setSectionList([...list])
  }

  const handleSectionItemAdd = (item: SortableListMenuItem) => {
    const config = findMatchingConfig(item.name, sectionConfig.sections)
    if (config) {
      const newItem = getDefaultSectionData(config)
      const newSections = [...data.data, newItem]
      const newData = { ...data, data: newSections }
      // @ts-ignore
      const newSectionList = getSectionListData(newSections)

      setData(newData)
      setSectionList(newSectionList)
    }
  }

  const handleSectionItemSelected = (item: SortableListItem) => {
    setNav({ ...nav, meta: false, section: item.id, blocks: [] })
  }

  console.log('editsection', nav, data, sectionConfig)

  return (
    <>
      <div className="px-4 pb-4 sm:px-6 lg:px-8">
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
          <SortableList
            title="Sections"
            list={sectionList}
            menu={sectionListMenu}
            handleListUpdate={handleSectionListUpdate}
            handleItemAdd={handleSectionItemAdd}
            handleItemSelected={handleSectionItemSelected}
          />
        )}
        {/* @ts-ignore */}
        {isSectionNav() && <SectionEdit data={data} id={nav.section} />}
      </div>
      <ActionBar handleSave={handleSave} saving={saving} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  )
}

const SectionEdit = ({ data, id }: { data: Section; id: string }) => {
  const currentData = findData(data.data, id)
  console.log('data', data, id, currentData)
  return <div>Section Edit</div>
}

const ActionBar = ({ handleSave, saving }: any) => {
  return (
    <div className="sticky bottom-0 mt-12 flex justify-between border-t border-gray-200 bg-white px-6 py-5 pl-4 lg:px-8">
      <div></div>
      <div className="space-x-3">
        <SecondaryButton onClick={() => console.log('cancel clicked')}>
          Cancel
        </SecondaryButton>
        <PrimaryButton disabled={saving} loading={saving} onClick={handleSave}>
          Save
        </PrimaryButton>
      </div>
    </div>
  )
}

export default Editor
