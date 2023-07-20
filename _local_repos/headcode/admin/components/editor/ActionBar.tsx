import { PrimaryButton, SecondaryButton } from "../../../ui/Buttons"

const ActionBar = ({ handleSave, saving }: any) => {
  return (
    <div className="sticky bottom-0 mt-12 flex justify-between border-t border-gray-200 bg-white px-6 py-5 pl-4 lg:px-8">
      <div></div>
      <div className="space-x-3">
        <SecondaryButton onClick={() => console.log('cancel clicked')}>
          Cancel
        </SecondaryButton>
        <PrimaryButton disabled={saving} loading={saving} onClick={handleSave}>
          Save
        </PrimaryButton>
      </div>
    </div>
  )
}

export default ActionBar