import {
  PrimaryButton,
  SecondaryButton,
  SecondaryDangerButton,
} from '../../../ui/Buttons'

const ActionBar = ({
  handleSave,
  saving,
  dirty,
  handleCancel,
  deleteTitle,
  handleDelete,
}: any) => {
  return (
    <div className="sticky bottom-0 mt-12 flex justify-between border-t border-gray-200 bg-white px-6 py-5 pl-4 lg:px-8">
      <div>
        {deleteTitle && (
          <SecondaryDangerButton onClick={handleDelete}>
            {deleteTitle}
          </SecondaryDangerButton>
        )}
      </div>
      <div className="space-x-3">
        <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
        <PrimaryButton
          disabled={saving || !dirty}
          loading={saving}
          onClick={handleSave}
        >
          Save
        </PrimaryButton>
      </div>
    </div>
  )
}

export default ActionBar
