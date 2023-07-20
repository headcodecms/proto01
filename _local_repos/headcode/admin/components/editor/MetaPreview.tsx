import { SecondaryButton } from "../../../ui/Buttons"

const MetaPreview = ({ values, handleMetaEdit }: any) => {
  return (
    <div>
      <h3 className="pb-2 text-lg font-semibold text-gray-900">Metadata</h3>
      {values.title === '' && values.description === '' && (
        <p className="text-sm text-gray-400">No meta data available.</p>
      )}
      {values.title.length > 0 && (
        <p className="max-w-xl truncate text-sm text-gray-400">
          {values.title}
        </p>
      )}
      {values.description.length > 0 && (
        <p className="max-w-xl truncate text-sm text-gray-400">
          {values.description}
        </p>
      )}
      <div className="mt-4">
        <SecondaryButton onClick={handleMetaEdit}>
          Edit Metadata
        </SecondaryButton>
      </div>
    </div>
  )
}

export default MetaPreview