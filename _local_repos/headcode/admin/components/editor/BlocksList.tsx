import { Data, EditorNav, SectionTypeConfig, SortableListItem, SortableListMenuItem } from '../../../types'
import { useState } from 'react'
import SortableList from '../../../ui/SortableList'
import { findData } from '../../../utils/data'
import { findMatchingConfig } from '../../../utils/config'

const BlocksList = ({
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
  const isSection = nav.blocks.length === 0
  const id = isSection ? nav.section : nav.blocks[nav.blocks.length - 1]
  const values = findData(data, id)
  const sectionConfig = findMatchingConfig(values?.name ?? '', config.sections)

  const [blocksList, setBlocksList] = useState(
    Array.isArray(values?.blocks)
      ? values?.blocks.map((item) => ({
          id: item.id,
          name: item.name,
          label: item.label,
        }))
      : []
  )
  const blocksListMenu = Array.isArray(sectionConfig?.blocks)
    ? sectionConfig?.blocks.map((item) => ({
        name: item.name,
        label: item.label,
      }))
    : null

  const handleBlocksListUpdate = (list: SortableListItem[]) => {
    setBlocksList([...list])
    handleListUpdate(list, values)
  }

  const handleBlocksItemAdd = (item: SortableListMenuItem) => {
    console.log('handleBlocksItemAdd', item)
  }

  const handleBlocksItemSelected = (item: SortableListItem) => {
    console.log('handleBlocksItemSelected', item)
  }

  console.log('BlocksList', id, values, sectionConfig)

  if (!blocksListMenu || !blocksList) {
    return <></>
  }

  return (
    <SortableList
      title="Blocks"
      list={blocksList}
      menu={blocksListMenu}
      handleListUpdate={handleBlocksListUpdate}
      handleItemAdd={handleBlocksItemAdd}
      handleItemSelected={handleBlocksItemSelected}
    />
  )
}

export default BlocksList
