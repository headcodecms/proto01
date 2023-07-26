'use client'

import { useEffect, useState } from 'react'
import StorageService from '../../services/StorageService'
import { DotPulse } from '@uiball/loaders'

const MediaLibrary = ({
  show,
  handleSelected,
}: {
  show: boolean
  handleSelected: any
}) => {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const appendImages = async () => {
    const newImages = await StorageService.list(100, images.length)
    setImages([...images, ...newImages])
    setLoading(false)
  }

  useEffect(() => {
    appendImages()
  }, [show])

  const handleImageLoaded = (e: any) => {
    const newImages = images.map((item) =>
      item.name === e.target.id
        ? {
            ...item,
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
          }
        : item
    )
    setImages(newImages)
  }

  if (loading) {
    return <DotPulse size={32} color="#9ca3af" />
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-5">
      {images.map((item, index) => {
        return (
          <a
            href="#"
            onClick={() => handleSelected(item)}
            key={index}
            className="shrink-0"
          >
            <img
              id={item.name}
              onLoad={handleImageLoaded}
              className="h-40 w-40 rounded border border-gray-300 object-cover object-center"
              src={StorageService.getPublicUrl(item.url)}
              alt={item.name}
            />
          </a>
        )
      })}
    </div>
  )
}

export default MediaLibrary
