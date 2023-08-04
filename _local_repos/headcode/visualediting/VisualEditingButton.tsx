'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

const VisualEditingButton = ({ info, children }: any) => {
  const [editingEnabled, setEditingEnabled] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener<any>('edit:enabled', (event: CustomEvent) => {
      setEditingEnabled(event.detail)
    })
  }, [])

  const handleEdit = () => {
    dispatchEvent(new CustomEvent('edit:open', { detail: info }))
  }

  return (
    editingEnabled && (
      <>
        <div className="absolute bottom-0 left-0 right-0 top-0 hidden bg-transparent opacity-50 outline -outline-offset-1 outline-blue-600 group-hover:block"></div>
        <button
          type="button"
          onClick={handleEdit}
          className="hover:opacity-100 group-hover:block absolute right-0 top-0 hidden max-w-[200px] truncate bg-blue-600 px-2 py-1 text-xs text-white opacity-80"
        >
          {children}
        </button>
      </>
    )
  )
}

export default VisualEditingButton
