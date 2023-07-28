'use client'

import { Dialog, Transition } from '@headlessui/react'
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import { showToastMessage } from '../../ui/Toast'
import { PrimaryButton, SecondaryButton } from '../../ui/Buttons'
import { addSection } from '../actions/SectionsAction'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type Slug = {
  slug: string | undefined
}

const classNames = {
  base: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
  error:
    'block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6',
}

const AddCollection = ({
  name,
  locale,
  data,
}: {
  name: string
  locale?: string
  data: any[]
}) => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const router = useRouter()
  const localeParam = locale ? `?locale=${locale}` : ''
  const slugs = data && data.map((item) => item.slug)
  const validationSchema = Yup.object({
    slug: Yup.string()
      .notOneOf(slugs, 'Already taken')
      .matches(/^[a-zA-Z0-9-_]*$/, 'Valid characters a-z A-Z 0-9 -_'),
  })

  const {
    register,
    watch,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm<Slug>({
    defaultValues: {
      slug: '',
    },
    resolver: yupResolver(validationSchema),
  })

  const handleAddCollection = async (data: any) => {
    const slug = data.slug

    setLoading(true)

    const dbError = await addSection(name, slug, locale)

    if (dbError) {
      showToastMessage(`Error adding ${slug} to ${name}`)
    } else {
      router.push(`/headcode/admin/collections/${name}/${slug}${localeParam}`)
      setLoading(false)
      setShow(false)
    }
  }

  return (
    <>
      <SecondaryButton onClick={() => setShow(true)}>Add</SecondaryButton>
      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShow}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6">
                  <form onSubmit={handleSubmit(handleAddCollection)}>
                    <div>
                      <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="space-y-2 leading-6">
                            <p className="text-sm text-gray-500">
                              Add a new{' '}
                              <strong className="font-bold">slug</strong> to
                              collection{' '}
                              <strong className="font-bold">{name}</strong>.
                            </p>
                            <p className="text-sm text-gray-500">
                              Allowed characters: [a-z][A-Z][0-9]-_
                            </p>
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="slug"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Slug
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                              <input
                                {...register('slug')}
                                type="text"
                                className={clsx(
                                  errors.slug
                                    ? classNames.error
                                    : classNames.base
                                )}
                              />
                              {errors.slug && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <ExclamationCircleIcon
                                    className="h-5 w-5 text-red-500"
                                    aria-hidden="true"
                                  />
                                </div>
                              )}
                            </div>
                            {errors.slug && (
                              <p
                                className="mt-2 text-sm text-red-600"
                                id="slug-error"
                              >
                                {errors.slug.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <PrimaryButton
                        type="submit"
                        disabled={loading || watch('slug')?.length === 0}
                        loading={loading}
                        className="w-full sm:ml-2 sm:w-auto"
                      >
                        Add
                      </PrimaryButton>
                      <SecondaryButton
                        className="mt-2 w-full sm:mt-0 sm:w-auto"
                        onClick={() => {
                          setShow(false)
                        }}
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setShow(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default AddCollection
