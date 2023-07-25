import { PhotoIcon } from '@heroicons/react/24/outline'
import SelectImageDialog from './SelectImageDialog'
import { useState } from 'react'

const EmptyImage = ({
  handleSelectFile,
  handleSelectFromLibrary,
}: any) => {
  const [showImageDialog, setShowImageDialog] = useState<boolean>(false)

  return (
    <>
      <div className="mt-1 flex max-w-xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-2 flex space-x-1 text-sm leading-6 text-gray-600">
            <button
              type="button"
              onClick={handleSelectFile}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Upload image
            </button>
            <span>or</span>
            <button
              type="button"
              onClick={() => setShowImageDialog(true)}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              select from media library
            </button>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 2MB
          </p>
        </div>
      </div>
      <SelectImageDialog
        show={showImageDialog}
        setShow={setShowImageDialog}
        handleSelected={handleSelectFromLibrary}
      />
    </>
  )
}

export default EmptyImage
