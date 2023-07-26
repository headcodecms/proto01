import { findMatchingConfig, getSectionListData } from '../../../utils/config'
import { Data, EditorNav, SectionConfig, SectionTypeConfig, SortableListItem, SortableListMenuItem } from '../../../types'
import { useState } from 'react'
import { getDefaultSectionData } from '../../../utils/data'
import SortableList from '../../../ui/SortableList'

const SectionList = ({
  data,
  config,
  nav,
  handleListUpdate,
  handleItemAdd,
  handleItemSelected,
}: {
  data: Data[]
  config: SectionTypeConfig
  nav: EditorNav
  handleListUpdate: any
  handleItemAdd: any
  handleItemSelected: any
}) => {
  const parsedSectionList = nav.hasSections ? getSectionListData(data) : []

  const [sectionList, setSectionList] = useState(parsedSectionList)
  const sectionListMenu = Array.isArray(config.sections)
    ? config.sections.map((item: SectionConfig) => ({
        name: item.name,
        label: item.label,
      }))
    : []

  const handleSectionListUpdate = (list: SortableListItem[]) => {
    setSectionList([...list])
    handleListUpdate(list)
  }

  const handleSectionItemAdd = (item: SortableListMenuItem) => {
    const sectionConfig = findMatchingConfig(item.name, config.sections)
    if (sectionConfig) {
      const newItem = getDefaultSectionData(sectionConfig)
      const newSections = [...data, newItem]
      const newSectionList = getSectionListData(newSections)

      setSectionList(newSectionList)
      handleItemAdd(newSections)
    } else {
      console.error('Cannot generate new section', item)
    }
  }

  if (!sectionListMenu || !sectionList) {
    return <></>
  }

  return (
    <SortableList
      title="Sections"
      list={sectionList}
      menu={sectionListMenu}
      handleListUpdate={handleSectionListUpdate}
      handleItemAdd={handleSectionItemAdd}
      handleItemSelected={handleItemSelected}
    />
  )
}

export default SectionList
