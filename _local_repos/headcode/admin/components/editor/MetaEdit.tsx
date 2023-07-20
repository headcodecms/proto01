import TextField from '../../../fields/TextField'
import TextAreaField from '../../../fields/TextAreaField'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { FormikProvider, useFormik } from 'formik'
import { useEffect } from 'react'

const MetaEdit = ({ values, handleMetaSubmit, metaSubmit }: any) => {
  const formik = useFormik({
    initialValues: values,
    onSubmit: handleMetaSubmit,
  })

  useEffect(() => {
    if (metaSubmit) {
      formik.handleSubmit()
    }
  }, [metaSubmit])

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 flex items-center space-x-2">
          <button type="submit">
            <ArrowLeftIcon className="h-8 w-8 rounded-md bg-gray-200 p-1.5 text-white hover:bg-gray-300" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">Metadata</h3>
        </div>
        <div className="space-y-4">
          <div>
            <TextField.render label="Title" name="title" />
          </div>
          <div>
            <TextAreaField.render label="Description" name="description" />
          </div>
        </div>
      </form>
    </FormikProvider>
  )
}

export default MetaEdit
