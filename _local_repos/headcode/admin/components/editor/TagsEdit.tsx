import { XMarkIcon } from '@heroicons/react/24/outline'
import { SecondaryButton } from '../../../ui/Buttons'
import { useState } from "react"

const TagsEdit = ({
  tags,
  handleUpdateTags,
}: {
  tags: string[]
  handleUpdateTags: any
}) => {
  const [newTag, setNewTag] = useState<string>('')

  const handleAddTag = () => {
    if (!tags.includes(newTag)) {
      handleUpdateTags([...tags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (index: number) => {
    handleUpdateTags(tags.filter((_item: string, i: number) => index !== i))
  }

  return (
    <div>
      <h3 className="pb-2 text-lg font-semibold text-gray-900">Tags</h3>
      <form className="mt-1 flex max-w-xl items-center">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.currentTarget.value)}
          className="mr-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <SecondaryButton
          type="submit"
          disabled={newTag.length === 0}
          onClick={handleAddTag}
        >
          Add
        </SecondaryButton>
      </form>
      <div className="mt-1 space-x-1">
        {tags.map((tag: any, index: number) => (
          <span
            key={index}
            className="inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2 pr-0.5 text-xs font-medium text-indigo-700"
          >
            {tag}
            <button
              type="button"
              className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
              onClick={() => handleRemoveTag(index)}
            >
              <XMarkIcon />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

export default TagsEdit