import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot } from 'lexical'
import { useEffect, useState } from 'react'

function PlaceholderPlugin() {
  const [editor] = useLexicalComposerContext()
  const [isEditorEmpty, setIsEditorEmpty] = useState(true)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot()
        const isEmpty = root.getTextContent().trim().length === 0
        setIsEditorEmpty(isEmpty)
      })
    })
  }, [editor])

  const focusEditor = () => {
    editor.focus()
  }

  return isEditorEmpty ? (
    <div
      className='editor-placeholder absolute left-4 top-3 z-0 text-gray-500 dark:text-gray-400'
      onClick={focusEditor}
    >
      내용을 입력하세요...
    </div>
  ) : null
}

export default PlaceholderPlugin
