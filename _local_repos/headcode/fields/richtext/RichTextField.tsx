'use client'

import { FieldComponent, FieldType, TextValue } from '../../types'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import RichTextMenuBar from './RichTextMenuBar'

const render = ({ form, label, name }: FieldComponent) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: form.getValues(name),
    editorProps: {
      attributes: {
        class:
          'w-full max-w-full min-h-[10vh] font-base prose prose-xs lg:prose-sm prose-p:leading-4 prose-ul:leading-0 prose-li:leading-4 cursor-text px-3 py-2 rounded-b-md focus:ring-inset focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none',
      },
    },
    onUpdate({ editor }) {
      form.setValue(name, editor.getHTML())
    },
  })

  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <RichTextMenuBar editor={editor} />
      <div className="relative  max-h-[30vh] w-full max-w-full overflow-y-auto rounded-b-md border border-gray-300">
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

const RichTextField: FieldType<TextValue, FieldComponent> = {
  render,
  defaultValue: '',
}

export default RichTextField
