import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { toast } from "react-hot-toast"

export const showToastMessage = (message: string) => {
  toast.custom((t) => (
    <div
      className={clsx(
        t.visible ? 'animate-enter' : 'animate-leave',
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'
      )}
    >
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex w-0 flex-1 justify-between">
            <p className="w-0 flex-1 text-sm font-medium text-gray-900">
              {message}
            </p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => toast.dismiss(t.id)}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ))
}
