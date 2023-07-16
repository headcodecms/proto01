'use client'

import { useEffect, useState } from 'react'
import {
  PrimaryButton,
  SecondaryButton,
  SecondaryDangerButton,
} from '../../ui/Buttons'
import ConfirmationDialog from '../../ui/ConfirmationDialog'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { getSectionConfig } from '../../utils/config'
import { parseData } from '../../utils/parser'
import Loading from '../Loading'

const EditSection = ({
  data,
  type,
  name,
  slug,
  locale,
  hasDelete,
}: {
  data: any
  type: string
  name: string
  slug?: string
  locale?: string
  hasDelete?: boolean
}) => {
  const router = useRouter()
  const localeParam = locale ? `?locale=${locale}` : ''
  const sectionConfig = getSectionConfig(name)

  const [storedData, setStoredData] = useState(null)

  useEffect(() => {
    const parsedData = parseData(data, name)
    setStoredData(parsedData)
  }, [])

  const handleSave = async () => {
    console.log('handle save')
  }

  console.log('editsection', storedData, sectionConfig)

  if (!storedData) {
    return (
      <div className="px-4 pb-4 sm:px-6 lg:px-8">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className="px-4 pb-4 sm:px-6 lg:px-8">Edit section</div>
      <div className="sticky bottom-0 mt-12 flex justify-between border-t border-gray-200 bg-white px-6 py-5 pl-4 lg:px-8">
        <div></div>
        <div className="space-x-3">
          <SecondaryButton
            onClick={() => {
              router.push(
                `/headcode/admin/${type}${slug ? '/' + name : ''}${localeParam}`
              )
            }}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            disabled={false}
            loading={false}
            onClick={() => handleSave()}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  )
}

export default EditSection
