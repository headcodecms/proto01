'use client'

import { useEffect, useState } from 'react'
import StorageService from '../../services/StorageService'
import { DotPulse } from '@uiball/loaders'
import { SecondaryButton } from '../../ui/Buttons'

const LIMIT = 20

const MediaLibrary = ({
  show,
  handleSelected,
}: {
  show: boolean
  handleSelected: any
}) => {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showMore, setShowMore] = useState<boolean>(false)

  const appendImages = async () => {
    const newImages = await StorageService.list(LIMIT, images.length)
    setImages([...images, ...newImages])
    setLoading(false)
    setShowMore(newImages.length === LIMIT)
  }

  useEffect(() => {
    appendImages()
  }, [show])

  const handleImageSelected = (item: any) => {
    const el = document.getElementById(item.name) as HTMLImageElement
    handleSelected({
      ...item,
      width: el.naturalWidth,
      height: el.naturalHeight,
    })
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-5">
        {images.map((item, index) => {
          return (
            <button
              onClick={() => handleImageSelected(item)}
              key={index}
              className="shrink-0"
            >
              <img
                id={item.name}
                className="h-40 w-40 rounded border border-gray-300 object-cover object-center"
                src={StorageService.getPublicUrl(item.url)}
                alt={item.name}
              />
            </button>
          )
        })}
      </div>
      {loading && <DotPulse size={32} color="#9ca3af" />}
      {showMore && (
        <SecondaryButton
          className="my-6 w-full"
          loading={loading}
          disabled={loading}
          onClick={() => {
            setLoading(true)
            appendImages()
          }}
        >
          Load More
        </SecondaryButton>
      )}
    </>
  )
}

export default MediaLibrary
