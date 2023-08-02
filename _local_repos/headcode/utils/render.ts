export const getPrevSectionValue = (
  sections: any[],
  currentIndex: number,
  field: string,
  defaultValue?: any
) => {
  return getIndexSectionValue(sections, currentIndex - 1, field, defaultValue)
}

export const getNextSectionValue = (
  sections: any[],
  currentIndex: number,
  field: string,
  defaultValue?: any
) => {
  return getIndexSectionValue(sections, currentIndex + 1, field, defaultValue)
}

export const getIndexSectionValue = (
  sections: any[],
  currentIndex: number,
  field: string,
  defaultValue?: any
) => {
  if (currentIndex < 0 || currentIndex >= sections.length) {
    return defaultValue ?? null
  }

  const section = sections[currentIndex]
  if (section.fields && section.fields.hasOwnProperty(field)) {
    return section.fields[field]
  }

  return defaultValue ?? null
}
