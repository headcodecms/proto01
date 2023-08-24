'use client'

import { FormEvent, useRef, useState } from 'react'
import { FieldComponent, FieldType, ImageData, ImageValue } from '../../types'
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

const render = ({ form, label, name }: FieldComponent) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const previewImgRef = useRef<HTMLImageElement>(null)
  const [previewImgSrc, setPreviewImgSrc] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [fileKey, setFileKey] = useState<number>(0)
  const [previewValue, setPreviewValue] = useState<PreviewValue>(null)
  const [url, setUrl] = useState<string | null>(form.getValues(`${name}.url`))

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSelectFromLibrary = (item: ImageData) => {
    console.log('handleSelectFromLibrary', item)
    
    if (item.width > 0 && item.height > 0 && typeof item.url === 'string') {
      const newFieldValue = {
        ...item,
        alt: '',
      }
      form.setValue(name, newFieldValue)
      setUrl(item.url)
      setFile(null)
      setPreviewValue(null)
    }
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
      const fileName = file.name
      const size = file.size
      const format = file.type
      const width = previewImgRef.current.naturalWidth
      const height = previewImgRef.current.naturalHeight

      const newPreviewValue: ImageValue = {
        ...ImageField.defaultValue,
        name: fileName,
        size,
        format,
        width,
        height,
      }

      setPreviewValue(newPreviewValue)

      const uploadedUrl = await uploadImage(file, fileName, format)

      if (uploadedUrl) {
        const newFieldValue = {
          ...newPreviewValue,
          url: uploadedUrl,
          alt: '',
        }
        form.setValue(name, newFieldValue)
        setFile(null)
        setPreviewValue(null)
        setUrl(uploadedUrl)
      } else {
        showToastMessage(`Error uploading image ${fileName}`)
      }
    }
  }

  const uploadImage = async (
    file: File,
    fileName: string,
    format: string
  ): Promise<string | null> => {
    const path = await StorageService.upload(file, fileName, format)

    return path
  }

  const handleCancelUpload = () => {
    setFile(null)
    setPreviewValue(null)
  }

  const handleDelete = () => {
    setFile(null)
    setPreviewValue(null)
    setUrl(null)
    setFileKey(fileKey + 1)
    form.setValue(name, ImageField.defaultValue)
  }

  return (
    <div className="max-w-xl">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <FileInput
        key={fileKey}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
      {url ? (
        <CurrentImage name={name} form={form} handleDelete={handleDelete} />
      ) : (
        <>
          {file ? (
            <PreviewImage
              name={name}
              form={form}
              previewImgRef={previewImgRef}
              previewImgSrc={previewImgSrc}
              previewValue={previewValue}
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

const FileInput = ({ fileInputRef, handleFileChange }: any) => (
  <input
    ref={fileInputRef}
    type="file"
    accept={Object.values(supportedFileTypes).join()}
    className="hidden"
    onChange={handleFileChange}
  />
)

const ImageField: FieldType<ImageValue, FieldComponent> = {
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
