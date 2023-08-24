'use client'

import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  InboxIcon,
  PencilSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'
import AuthService from '../services/AuthService'
import { AuthUser, VisualEditingData } from '../types'
import { DotPulse } from '@uiball/loaders'
import { SubmitHandler, useForm } from 'react-hook-form'
import Banner from '../ui/Banner'
import Input from '../ui/Input'
import { PrimaryButton, SecondaryButton } from '../ui/Buttons'
import Link from 'next/link'
import Editor from '../admin/components/editor/Editor'
import config from '@/headcode.config'
import { useRouter } from 'next/navigation'
import { getDefaultSection } from '../utils/config'

const VIEW = {
  loading: 'loading',
  login: 'login',
  editor: 'editor',
  error: 'error',
}

const VisualEditing = () => {
  const router = useRouter()
  const [editingEnabled, setEditingEnabled] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [view, setView] = useState<string>(VIEW.loading)
  const [info, setInfo] = useState<VisualEditingData | null>(null)
  const [data, setData] = useState<any>(null)
  const showVisualEditing = process.env.NODE_ENV === 'development'

  useEffect(() => {
    window.addEventListener<any>('edit:open', (event: CustomEvent) => {
      const { origin, data } = event.detail
      if (origin !== 'headcodecms.com') return

      setInfo(data)
      setShowDialog(true)
    })
  }, [])

  useEffect(() => {
    if (showDialog) {
      setView(VIEW.loading)
      loadUser()
    } else {
      setView(VIEW.loading)
    }
  }, [showDialog])

  const loadSection = async () => {
    if (info) {
      const params: { name: string; slug?: string; locale?: string } = {
        name: info.name,
      }
      if (info.slug) params.slug = info.slug
      if (info.locale) params.locale = info.locale

      const searchParams = new URLSearchParams(params)

      const url = `/headcode/visualeditor/section?${searchParams}`
      const response = await fetch(url)
      const newData = await response.json()

      if (newData.hasOwnProperty('status')) {
        if (!info.slug && newData.status === 'empty') {
          setData(getDefaultSection(info.name, undefined, info.locale))
          setView(VIEW.editor)
        } else {
          setView(VIEW.error)
        }
      } else {
        setData(newData)
        setView(VIEW.editor)
      }
    }
  }

  const loadUser = async () => {
    const newUser = await AuthService.getUser()
    if (newUser) {
      await loadSection()
    } else {
      setView(VIEW.login)
    }
  }

  const handleVisualEditing = () => {
    const newValue = !editingEnabled

    dispatchEvent(new CustomEvent('edit:enabled', { detail: newValue }))
    setEditingEnabled(newValue)
  }

  const handleAdmin = () => {
    if (info) {
      const localeParam = info.locale ? `?locale=${info.locale}` : ''
      const url = info.slug
        ? `/headcode/admin/collections/${info.name}/${info.slug}${localeParam}`
        : `/headcode/admin/globals/${info.name}${localeParam}`

      router.push(url)
    }
  }

  const handleCancel = () => {
    setShowDialog(false)
    router.refresh()
  }

  return (
    <>
      {showVisualEditing ? (
        <>
          <div className="fixed bottom-[6%] left-1/2 flex -translate-x-1/2 items-center space-x-4 rounded-full border-2 border-gray-600 bg-gray-700 px-4 py-1 text-gray-200">
            <button type="button">
              <ChatBubbleOvalLeftIcon className="h-10 w-10 rounded-full px-2 py-1 text-gray-300 hover:bg-gray-600 hover:text-white" />
            </button>
            <button type="button">
              <InboxIcon className="h-10 w-10 rounded-full px-2 py-1 text-gray-300 hover:bg-gray-600 hover:text-white" />
            </button>
            <button type="button" onClick={handleVisualEditing}>
              <PencilSquareIcon
                className={clsx(
                  'h-10 w-10 rounded-full px-2 py-1 text-gray-300 hover:bg-gray-600 hover:text-white',
                  editingEnabled && 'border border-gray-500 bg-gray-600'
                )}
              />
            </button>
            <button type="button">
              <ArrowUpTrayIcon className="h-10 w-10 rounded-full px-2 py-1 text-gray-300 hover:bg-gray-600 hover:text-white" />
            </button>
            <button type="button">
              <EllipsisHorizontalIcon className="h-10 w-10 rounded-full px-2 py-1 text-gray-300 hover:bg-gray-600 hover:text-white" />
            </button>
          </div>
        </>
      ) : null}

      <Transition.Root show={showDialog} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCancel}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="mr-0 flex min-h-full items-center justify-center p-4 text-center sm:mx-5 sm:justify-end sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-full transform overflow-y-auto rounded-lg bg-white pt-5 text-left shadow-xl transition-all sm:my-8 sm:h-[90vh] sm:max-w-3xl">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="px-4 text-base font-medium uppercase text-gray-900 sm:px-6 lg:px-8"
                    >
                      <div className="">Headcode</div>
                      <Version />
                    </Dialog.Title>
                    <div className="mt-4">
                      {view === VIEW.login && (
                        <LoginView loadSection={loadSection} />
                      )}
                      {view === VIEW.loading && (
                        <div className="px-4 py-6 sm:px-6 lg:px-8">
                          <DotPulse size={32} color="#9ca3af" />
                        </div>
                      )}
                      {view === VIEW.editor && info && info.name && (
                        <>
                          <EditorHeader info={info} />
                          <Editor
                            storedData={data}
                            name={info.name ?? ''}
                            slug={info.slug || undefined}
                            locale={info.locale || undefined}
                            section={info.section}
                            handleCancel={handleCancel}
                          />
                        </>
                      )}
                      {view === VIEW.error && (
                        <Banner error={true} size="xs">
                          Error getting section data for {info?.name}
                          {info?.slug} {info?.locale}
                        </Banner>
                      )}
                    </div>
                    <div className="absolute right-0 top-0 flex flex-row-reverse items-center pr-4 pt-4">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleCancel}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <SecondaryButton onClick={handleAdmin} className="mr-4">
                        <span className="hidden pr-2 sm:inline">Admin</span>
                        <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400" />
                      </SecondaryButton>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

const EditorHeader = ({ info }: { info: VisualEditingData | null }) => {
  if (!info) return null

  return (
    <div className="px-4 pb-8 sm:px-6 lg:px-8">
      <div>
        <span className="text-sm text-gray-400 hover:text-gray-500">
          {info.slug ? 'Collections' : 'Globals'}
        </span>
        {info.slug && (
          <>
            <span className="px-2 text-sm text-gray-400">/</span>
            <span className="text-sm text-gray-400 hover:text-gray-500">
              {info.name}
            </span>
          </>
        )}
      </div>
      <h1 className="flex items-center space-x-2 text-2xl font-semibold text-gray-900">
        <span>{info.slug ?? info.name}</span>
        {info.locale && (
          <span className="rounded border border-gray-300 px-1.5 py-0.5 text-xs uppercase text-gray-400">
            {info.locale}
          </span>
        )}
      </h1>
    </div>
  )
}

const Version = () => (
  <div className="mt-1 flex items-center space-x-2">
    <IconVersion className="h-6 w-6 text-gray-300" />
    <span className="text-sm text-gray-400">{config.version}</span>
  </div>
)

const IconVersion = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435ZM8.75 6v1c.14.301.338.617.588.95.537.716 1.259 1.44 2.016 2.196l-.708.708-.015-.016c-.652-.652-1.33-1.33-1.881-2.015V12h-1.5V6H6.034a.25.25 0 0 1-.192-.41l1.966-2.36a.25.25 0 0 1 .384 0l1.966 2.36a.25.25 0 0 1-.192.41H8.75Z" />
  </svg>
)

const LoginView = ({ loadSection }: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit } = useForm<AuthUser>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin: SubmitHandler<AuthUser> = async (data) => {
    setError(null)
    setLoading(true)

    const newError = await AuthService.signIn(data.email, data.password)

    if (!newError) {
      await loadSection()
    } else {
      setError(newError)
      setLoading(false)
    }
  }

  return (
    <form
      className="max-w-md px-4 pb-4 sm:px-6 lg:px-8"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="my-9 space-y-3">
        <h1 className="mb-6 flex items-center space-x-2 text-2xl font-semibold text-gray-900">
          Sign in to your account
        </h1>
        {error && (
          <Banner error={true} size="xs">
            {error}
          </Banner>
        )}
        <Input label="Email address" type="email" {...register('email')} />
        <Input label="Password" type="password" {...register('password')} />
      </div>
      <div>
        <PrimaryButton loading={loading} className="w-full" type="submit">
          Sign In
        </PrimaryButton>
      </div>
      <div className="mt-9 flex items-center justify-between">
        <div className="text-sm">
          <Link
            href="/headcode/login/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </div>
      </div>
    </form>
  )
}

export default VisualEditing
