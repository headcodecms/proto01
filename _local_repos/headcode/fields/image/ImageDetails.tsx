import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { supportedFileTypes } from './ImageField'
import StorageService from '../../services/StorageService'
import { useState } from 'react'

const displayFormat = (format: string | null) => {
  if (!format) return ''

  const entry = Object.entries(supportedFileTypes).find(
    (entry: any) => entry[1] === format
  )
  return entry ? entry[0] : ''
}

const displayCompact = (number: number) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(number)
}

const ImageDetails = ({ imageValue, name, form }: any) => {
  const [alt, setAlt] = useState<string>(form.getValues(`${name}.alt`))

  const handleCopyToClipboard = () => {
    if (imageValue.url && 'clipboard' in navigator) {
      navigator.clipboard.writeText(StorageService.getPublicUrl(imageValue.url))
    }
  }

  const handleAltChanged = (e: any) => {
    const newAlt = e.currentTarget.value
    const value = form.getValues(name)
    form.setValue(name, { ...value, alt: newAlt })
    setAlt(newAlt)
  }

  return (
    <>
      <div className="text-sm">{imageValue.name}</div>
      <div className="flex items-center space-x-2">
        <span className="truncate text-xs text-gray-400">
          {imageValue.url ?? ''}
        </span>
        {imageValue.url && (
          <button type="button" onClick={handleCopyToClipboard}>
            <DocumentDuplicateIcon className="h-4 w-4 text-gray-400 hover:text-gray-500" />
          </button>
        )}
      </div>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="ALT text"
        value={alt}
        onChange={handleAltChanged}
      />
      <p className="mt-1 divide-x divide-solid divide-gray-300 text-xs text-gray-400">
        <span className="pr-1">{displayFormat(imageValue.format)}</span>
        <span className="px-1">
          {imageValue.width}px x {imageValue.width}px
        </span>
        <span className="pl-1">{displayCompact(imageValue.size)}</span>
      </p>
    </>
  )
}

export default ImageDetails
