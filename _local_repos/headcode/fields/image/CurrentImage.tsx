import { FieldInputProps } from "formik"
import Image from "next/image"
import ImageDetails from "./ImageDetails"
import { SecondaryButton } from "../../ui/Buttons"

const CurrentImage = ({
  field,
  altField,
  props,
  handleDelete,
}: {
  field: FieldInputProps<any>
  altField: FieldInputProps<any>
  props: any
  handleDelete: any
}) => {
  return (
    <div className="mt-1 flex flex-col items-start space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="shrink-0">
        <Image
          className="h-40 w-40 rounded border border-gray-300 object-cover object-center"
          src={
            'https://www.salzburg.gv.at/Style%20Library/icospcms/g/logo-sbg.png'
          }
          alt={field.value.alt}
          width={field.value.width}
          height={field.value.height}
          placeholder={field.value.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={field.value.blurDataURL ?? ''}
        />
      </div>
      <div className="w-full shrink truncate p-1">
        <ImageDetails
          imageValue={field.value}
          altField={altField}
          props={props}
        />
        <div className="mt-3 flex items-center justify-end">
          <SecondaryButton onClick={handleDelete}>Delete</SecondaryButton>
        </div>
      </div>
    </div>
  )
}

export default CurrentImage