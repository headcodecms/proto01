import Image from 'next/image'
import ImageDetails from './ImageDetails'
import { SecondaryButton } from '../../ui/Buttons'
import StorageService from '../../services/StorageService'

const CurrentImage = ({
  name,
  form,
  handleDelete,
}: {
  name: string
  form: any
  handleDelete: any
}) => {
  const value = form.getValues(name)
  return (
    <div className="mt-1 flex flex-col items-start space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="shrink-0">
        <Image
          className="h-40 w-40 rounded border border-gray-300 object-cover object-center"
          src={StorageService.getPublicUrl(value.url)}
          alt={value.alt}
          width={value.width}
          height={value.height}
        />
      </div>
      <div className="w-full shrink truncate p-1">
        <ImageDetails imageValue={value} name={name} form={form} />
        <div className="mt-3 flex items-center justify-end">
          <SecondaryButton onClick={handleDelete}>Delete</SecondaryButton>
        </div>
      </div>
    </div>
  )
}

export default CurrentImage
