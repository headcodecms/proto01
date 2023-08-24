'use client'

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
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 hidden bg-transparent opacity-50 outline -outline-offset-1 outline-blue-600 group-hover:block"></div>
        <button
          type="button"
          onClick={handleEdit}
          className="absolute right-0 top-0 hidden max-w-[250px] truncate bg-blue-600 px-2 py-1 text-xs text-white opacity-80 hover:opacity-100 group-hover:block"
        >
          {children}
        </button>
      </>
    )
  )
}

export default VisualEditingButton
