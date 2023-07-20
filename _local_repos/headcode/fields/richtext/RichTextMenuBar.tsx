import clsx from 'clsx'
import { useState } from 'react'
import RichTextLinkDialog from './RichTextLinkDialog'

const getClassName = (isActive: boolean) =>
  clsx(
    'rounded-md px-2 py-1 hover:bg-gray-200',
    isActive ? 'text-gray-600 bg-gray-200' : 'text-gray-400'
  )

const iconSize = 'h-5 w-5'

const Undo = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().undo().run()}
    disabled={!editor.can().undo()}
    className={getClassName(editor.can().undo())}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
      />
      <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
    </svg>
  </button>
)

const Redo = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().redo().run()}
    disabled={!editor.can().redo()}
    className={getClassName(editor.can().redo())}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
      />
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
    </svg>
  </button>
)

const H1 = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    className={getClassName(editor.isActive('heading', { level: 1 }))}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />
    </svg>
  </button>
)

const H2 = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    className={getClassName(editor.isActive('heading', { level: 2 }))}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z" />
    </svg>
  </button>
)

const H3 = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
    className={getClassName(editor.isActive('heading', { level: 3 }))}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />
    </svg>
  </button>
)

const Bold = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleBold().run()}
    disabled={!editor.can().chain().focus().toggleBold().run()}
    className={getClassName(editor.isActive('bold'))}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
    </svg>
  </button>
)

const Italic = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleItalic().run()}
    disabled={!editor.can().chain().focus().toggleItalic().run()}
    className={getClassName(editor.isActive('italic'))}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
    </svg>
  </button>
)

const Link = ({ editor, setShowLinkDialog }: any) => (
  <button
    type="button"
    onClick={() => {
      editor.commands.focus()
      setShowLinkDialog(true)
    }}
    className={getClassName(editor.isActive('link'))}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
    </svg>
  </button>
)

const ClearLink = ({ editor }: any) => (
  <button
    type="button"
    disabled={!editor.isActive('link')}
    onClick={() => editor.chain().focus().unsetLink().run()}
    className={getClassName(editor.isActive('link'))}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
      <path
        transform="translate(5,4)"
        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  </button>
)

const BulletList = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    className={getClassName(editor.isActive('bulletList'))}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      />
    </svg>
  </button>
)

const OrderedList = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleOrderedList().run()}
    className={getClassName(editor.isActive('orderedList'))}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
      />
      <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
    </svg>
  </button>
)

const ClearFormatting = ({ editor }: any) => (
  <button
    type="button"
    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
    className={getClassName(false)}
  >
    <svg fill="currentColor" className={iconSize} viewBox="0 0 16 16">
      <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
      <path
        transform="translate(5,4)"
        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  </button>
)

const RichTextMenuBar = ({ editor }: any) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false)

  const handleSetLink = (link: string | null) => {
    if (link) {
      if (link.length === 0) {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
      } else {
        editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: link })
        .run()
      }
    }
    
    setShowLinkDialog(false)
  }

  if (!editor) {
    return null
  }

  return (
    <div className="mt-1 flex items-center space-x-1 rounded-t-md overflow-x-scroll bg-gray-100 px-1.5 py-1">
      <Undo editor={editor} />
      <Redo editor={editor} />
      <H1 editor={editor} />
      <H2 editor={editor} />
      <H3 editor={editor} />
      <Bold editor={editor} />
      <Italic editor={editor} />
      <Link editor={editor} setShowLinkDialog={setShowLinkDialog} />
      <ClearLink editor={editor} />
      <BulletList editor={editor} />
      <OrderedList editor={editor} />
      <ClearFormatting editor={editor} />
      <RichTextLinkDialog
        currentUrl={editor.getAttributes('link').href}
        show={showLinkDialog}
        setShow={setShowLinkDialog}
        handleSetLink={handleSetLink}
      />
    </div>
  )
}

export default RichTextMenuBar
