import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useRef, useState } from 'react'
import { PrimaryButton, SecondaryButton } from '../../ui/Buttons'

const RichTextLinkDialog = ({
  currentUrl,
  show,
  setShow,
  handleSetLink,
}: any) => {
  const [url, setUrl] = useState(currentUrl ?? '')
  let focusRef = useRef(null)

  useEffect(() => {
    if (show) {
      setUrl(currentUrl ?? '')
    }
  }, [show])

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={focusRef}
        onClose={setShow}
      >
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
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSetLink(url)
                  }}
                >
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
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Update URL
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="space-y-2 leading-6">
                          <p className="text-sm text-gray-500">
                            Add or update a web link. Empty URL will remove the
                            link.
                          </p>
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="url"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            URL
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                              id="url"
                              name="url"
                              type="text"
                              ref={focusRef}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              value={url}
                              onChange={(e) => setUrl(e.currentTarget.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <PrimaryButton
                      type="submit"
                      disabled={url.length === 0}
                      className="w-full sm:ml-2 sm:w-auto"
                    >
                      Update
                    </PrimaryButton>
                    <SecondaryButton
                      className="mt-2 w-full sm:mt-0 sm:w-auto"
                      onClick={() => setShow(false)}
                    >
                      Cancel
                    </SecondaryButton>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default RichTextLinkDialog
