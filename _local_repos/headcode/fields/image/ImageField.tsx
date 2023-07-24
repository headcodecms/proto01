'use client'

import { useField } from 'formik'
import { FormEvent, useRef, useState } from 'react'
import { FieldType, ImageValue } from '../../types'
import { showToastMessage } from '../../ui/Toast'
import CurrentImage from './CurrentImage'
import EmptyImage from './EmptyImage'
import PreviewImage from './PreviewImage'
import StorageService from '../../services/StorageService'

const MAX_FILE_SIZE = 2 * 1024 * 1024

export const supportedFileTypes = {
  GIF: 'image/gif',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
}

type PreviewValue = typeof ImageField.defaultValue | null

const render = ({ label, name, ...props }: { label: string; name: string }) => {
  const nameAlt = `${name}.alt`

  const [field, _meta, helpers] = useField({ ...props, name })
  const [altField] = useField({ ...props, name: nameAlt })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const previewImgRef = useRef<HTMLImageElement>(null)
  const [previewImgSrc, setPreviewImgSrc] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [previewValue, setPreviewValue] = useState<PreviewValue>(null)

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSelectFromLibrary = () => {
    console.log('select from library')
  }

  const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length === 1) {
      const newFile = e.currentTarget.files[0]
      if (newFile.size > MAX_FILE_SIZE) {
        showToastMessage('Image larger than 2MB')
      } else {
        setFile(newFile)
        setPreviewImgSrc(URL.createObjectURL(newFile))
        setPreviewValue(null)
      }
    }
  }

  const handlePreviewFileLoad = async () => {
    if (file && previewImgRef.current && !previewValue) {
      const name = file.name
      const size = file.size
      const format = file.type
      const width = previewImgRef.current.naturalWidth
      const height = previewImgRef.current.naturalHeight

      const newPreviewValue: ImageValue = {
        ...ImageField.defaultValue,
        name,
        size,
        format,
        width,
        height,
      }

      setPreviewValue(newPreviewValue)

      const url = await uploadImage(file, name, format)

      if (url) {
        const newFieldValue = {
          ...newPreviewValue,
          alt: altField.value,
          url,
        }
        helpers.setValue(newFieldValue)
        setFile(null)
        setPreviewValue(null)
      } else {
        showToastMessage(`Error uploading image ${name}`)
      }
    }
  }

  const uploadImage = async (
    file: File,
    name: string,
    format: string
  ): Promise<string | null> => {
    const path = await StorageService.upload(file, name, format)

    return path
  }

  const handleCancelUpload = () => {
    setFile(null)
    setPreviewValue(null)
  }

  const handleDelete = () => {
    setFile(null)
    setPreviewValue(null)
    helpers.setValue(ImageField.defaultValue, false)
  }

  console.log('image field', field, altField, previewImgSrc, previewValue)

  if (!field || !altField) {
    return null
  }

  return (
    <div className="max-w-xl">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        ref={fileInputRef}
        type="file"
        accept={Object.values(supportedFileTypes).join()}
        className="hidden"
        onChange={handleFileChange}
      />
      {field.value.url ? (
        <CurrentImage
          field={field}
          altField={altField}
          props={props}
          handleDelete={handleDelete}
        />
      ) : (
        <>
          {file ? (
            <PreviewImage
              previewImgRef={previewImgRef}
              previewImgSrc={previewImgSrc}
              previewValue={previewValue}
              altField={altField}
              props={props}
              handlePreviewFileLoad={handlePreviewFileLoad}
              handleCancelUpload={handleCancelUpload}
            />
          ) : (
            <EmptyImage
              handleSelectFile={handleSelectFile}
              handleSelectFromLibrary={handleSelectFromLibrary}
            />
          )}
        </>
      )}
    </div>
  )
}

const ImageField: FieldType<ImageValue> = {
  render,
  defaultValue: {
    name: null,
    url: null,
    alt: '',
    width: 0,
    height: 0,
    size: 0,
    format: null,
  },
}

export default ImageField
