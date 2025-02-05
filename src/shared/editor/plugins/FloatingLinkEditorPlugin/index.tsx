import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $findMatchingParent, mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  KEY_ESCAPE_COMMAND,
  KEY_ENTER_COMMAND,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function FloatingLinkEditor({
  editor,
  isLink,
  setIsLink,
  anchorElem,
}: {
  editor: any
  isLink: boolean
  setIsLink: (v: boolean) => void
  anchorElem: HTMLElement
}): JSX.Element {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [editedLinkUrl, setEditedLinkUrl] = useState('')
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const linkNode = node?.getParent?.()

      if ($isLinkNode(linkNode)) {
        setLinkUrl(linkNode.getURL())

        // 링크 노드의 DOM 요소 위치를 가져옵니다
        const domElement = editor.getElementByKey(linkNode.getKey())
        if (domElement) {
          const rect = domElement.getBoundingClientRect()
          setPosition({
            top: rect.bottom + window.pageYOffset + 5, // 링크 아래 5px 간격
            left: rect.left + window.pageXOffset,
          })
        }
      }
    }
  }, [editor])

  useEffect(() => {
    if (isLink) {
      setEditedLinkUrl(linkUrl)
      inputRef.current?.focus()
    }
  }, [isLink, linkUrl])

  useEffect(() => {
    const editorElem = editorRef.current
    if (editorElem) {
      editorElem.style.top = `${position.top}px`
      editorElem.style.left = `${position.left}px`
    }
  }, [position])

  useEffect(() => {
    const removeFloatingLinkEditor = () => {
      setIsLink(false)
    }

    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      removeFloatingLinkEditor,
      COMMAND_PRIORITY_CRITICAL,
    )
  }, [editor, setIsLink])

  useEffect(() => {
    const updateToolbar = () => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const node = getSelectedNode(selection)
          const parent = node?.getParent()

          if ($isLinkNode(parent) || $isLinkNode(node)) {
            setIsLink(true)
            updateLinkEditor()
          } else {
            setIsLink(false)
          }
        }
      })
    }

    document.addEventListener('selectionchange', updateToolbar)
    return () => {
      document.removeEventListener('selectionchange', updateToolbar)
    }
  }, [editor, updateLinkEditor])

  const monitorInputInteraction = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleLinkSubmission()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setIsLink(false)
    }
  }

  const handleLinkSubmission = () => {
    if (editedLinkUrl !== '') {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, editedLinkUrl)
    }
    setIsLink(false)
  }

  return (
    <div
      ref={editorRef}
      className='absolute z-50 min-w-[300px] rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800'
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className='flex items-center gap-2'>
        <input
          ref={inputRef}
          className='flex-1 rounded-md border border-gray-200 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
          value={editedLinkUrl}
          onChange={(e) => setEditedLinkUrl(e.target.value)}
          onKeyDown={(e) => monitorInputInteraction(e)}
          placeholder='링크를 입력하세요'
        />
        <button
          className='rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600'
          onClick={handleLinkSubmission}
        >
          저장
        </button>
      </div>
    </div>
  )
}

function getSelectedNode(selection: RangeSelection) {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $findMatchingParent(focusNode, (node) => node.is(anchorNode))
  } else {
    return $findMatchingParent(anchorNode, (node) => node.is(focusNode))
  }
}

function FloatingLinkEditorPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  const [isLink, setIsLink] = useState(false)

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        TOGGLE_LINK_COMMAND,
        (_url: string) => {
          setIsLink(true)
          return false
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          const selection = $getSelection()
          if (!$isRangeSelection(selection)) return false

          const node = getSelectedNode(selection)
          const parent = node?.getParent()

          if ($isLinkNode(parent) || $isLinkNode(node)) {
            setIsLink(true)
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor])

  return isLink
    ? createPortal(
        <FloatingLinkEditor
          editor={editor}
          isLink={isLink}
          setIsLink={setIsLink}
          anchorElem={anchorElem}
        />,
        anchorElem,
      )
    : null
}

export default FloatingLinkEditorPlugin
