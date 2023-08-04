'use client'

import { Dialog, Transition } from '@headlessui/react'
import {
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
import { PrimaryButton } from '../ui/Buttons'
import Link from 'next/link'
import Editor from '../admin/components/editor/Editor'

const VIEW = {
  loading: 'loading',
  login: 'login',
  editor: 'editor',
}

const VisualEditing = () => {
  const [editingEnabled, setEditingEnabled] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [view, setView] = useState<string>(VIEW.loading)
  const [info, setInfo] = useState<VisualEditingData | null>(null)
  const [data, setData] = useState<any>(null)

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
    console.log('load section', info)
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

      setData(newData)
      setView(VIEW.editor)
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

  return (
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
      <Transition.Root show={showDialog} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowDialog}>
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
                <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-[960px] sm:p-6">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {view === VIEW.login && 'Sign in to your account'}
                    </Dialog.Title>
                    <div className="mt-2">
                      {view === VIEW.login && (
                        <LoginView loadSection={loadSection} />
                      )}
                      {view === VIEW.loading && (
                        <DotPulse size={32} color="#9ca3af" />
                      )}
                      {view === VIEW.editor && info && info.name && (
                        <Editor
                          storedData={data}
                          name={info.name}
                          slug={info.slug || undefined}
                          locale={info.locale || undefined}
                        />
                      )}
                    </div>
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setShowDialog(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
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
    <form className="max-w-md" onSubmit={handleSubmit(handleLogin)}>
      {error && (
        <Banner error={true} size="xs">
          {error}
        </Banner>
      )}
      <div className="my-9 space-y-3">
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
