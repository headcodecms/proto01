import TextField from '../../../fields/TextField'
import TextAreaField from '../../../fields/TextAreaField'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const MetaEdit = ({
  values,
  handleMetaSubmit,
  metaSubmit,
  updateDirty,
}: any) => {
  const form = useForm<any>({
    defaultValues: values,
  })

  useEffect(() => {
    if (metaSubmit) {
      handleMetaSubmit(form.getValues())
    }
  }, [metaSubmit])

  return (
      <form onSubmit={form.handleSubmit(handleMetaSubmit)}>
        <div className="mb-4 flex items-center space-x-2">
          <button type="submit">
            <ArrowLeftIcon className="h-8 w-8 rounded-md bg-gray-200 p-1.5 text-white hover:bg-gray-300" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">Metadata</h3>
        </div>
        <div className="space-y-4">
          <div>
            <TextField.render form={form} label="Title" name="title" />
          </div>
          <div>
            <TextAreaField.render form={form} label="Description" name="description" />
          </div>
        </div>
      </form>
  )
}

export default MetaEdit
