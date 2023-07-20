import { Data, FieldsData } from '../types'

export const findData = (list: Data[], id: string | null): Data | null => {
  for (let i = 0; i < list.length; i++) {
    const data = list[i]
    if (data.id === id) {
      return data
    } else {
      if (Array.isArray(data.blocks)) {
        const foundData = findData(data.blocks, id)
        if (foundData) {
          return foundData
        }
      }
    }
  }
  return null
}

export const getUpdatedFieldsData = (
  list: Data[],
  id: string,
  fields: FieldsData
): Data[] => {
  return list.map((item: Data) => {
    return {
      ...item,
      fields: item.id === id ? fields : item.fields,
      blocks: Array.isArray(item.blocks)
        ? getUpdatedFieldsData(item.blocks, id, fields)
        : null,
    }
  })
}

export const getUpdatedBlocksData = (
  list: Data[],
  id: string,
  blocks: Data[]
): Data[] => {
  return list.map((item: Data) => {
    if (item.id === id) {
      return {
        ...item,
        blocks,
      }
    }

    if (Array.isArray(item.blocks)) {
      return {
        ...item,
        blocks: getUpdatedBlocksData(item.blocks, id, blocks),
      }
    }

    return { ...item }
  })
}

type ListItem = {
  id: string
}

export const sortListByList = <T extends ListItem>(
  data: T[],
  list: ListItem[]
) => {
  const listIds = list.map((item) => item.id)
  return data.sort((a, b) => listIds.indexOf(a.id) - listIds.indexOf(b.id))
}
