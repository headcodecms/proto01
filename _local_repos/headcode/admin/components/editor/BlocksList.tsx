import {
  Data,
  EditorNav,
  SectionTypeConfig,
  SortableListItem,
  SortableListMenuItem,
} from '../../../types'
import { useState } from 'react'
import SortableList from '../../../ui/SortableList'
import { findData, getDefaultBlockData } from '../../../utils/data'
import { findMatchingConfig } from '../../../utils/config'
import { getNavId } from '../../../utils/parser'

const getBlockListItem = (item: Data) => ({
  id: item.id,
  name: item.name,
  label: item.label,
})

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
  const id = getNavId(nav)
  const values = findData(data, id)
  const sectionConfig = findMatchingConfig(values?.name ?? '', config.sections)

  const [blocksList, setBlocksList] = useState(
    Array.isArray(values?.blocks)
      ? values?.blocks.map((item) => getBlockListItem(item))
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
    if (blocksList && sectionConfig) {
      const newBlock = getDefaultBlockData(item.name, sectionConfig)
      if (newBlock && values && values.blocks) {
        setBlocksList([...blocksList, getBlockListItem(newBlock)])
        const newValues = { ...values, blocks: [...values.blocks, newBlock] }
        handleItemAdd(newValues)
      } else {
        console.error('Cannot generate new block', item)
      }
    }
  }

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
      handleItemSelected={handleItemSelected}
    />
  )
}

export default BlocksList
