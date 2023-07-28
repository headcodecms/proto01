import { DotPulse } from '@uiball/loaders'
import ImageDetails from './ImageDetails'
import { SecondaryButton } from '../../ui/Buttons'

const PreviewImage = ({
  name,
  form,
  previewImgRef,
  previewImgSrc,
  previewValue,
  handlePreviewFileLoad,
  handleCancelUpload,
}: any) => {
  return (
    <div className="mt-1 flex flex-col items-start space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="shrink-0">
        <img
          ref={previewImgRef}
          onLoad={handlePreviewFileLoad}
          className="h-40 w-40 rounded border border-gray-300 object-cover object-center"
          src={previewImgSrc}
          alt="Preview image"
        />
      </div>
      <div className="w-full shrink truncate p-1">
        {previewValue && (
          <>
            <ImageDetails
              imageValue={previewValue}
              name={name}
              form={form}
            />
            <div className="mt-3 flex items-center justify-between">
              <DotPulse size={32} color="#6b7280" />
              <div>
                <SecondaryButton onClick={handleCancelUpload}>
                  Cancel
                </SecondaryButton>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PreviewImage
