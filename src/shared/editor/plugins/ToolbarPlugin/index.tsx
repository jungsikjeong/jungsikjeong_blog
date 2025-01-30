'use client'

import { $createCodeNode, getDefaultCodeLanguage } from '@lexical/code'
import { $createLinkNode } from '@lexical/link'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  $isListNode,
  ListNode,
  $createListNode,
  $createListItemNode,
} from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $setBlocksType } from '@lexical/selection'
import {
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from 'lexical'
import { $createImageNode } from '../../nodes/ImageNode/ImageNode'
import { useState, useEffect } from 'react'

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isOrderedList, setIsOrderedList] = useState(false)
  const [isUnorderedList, setIsUnorderedList] = useState(false)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat('bold'))
          setIsItalic(selection.hasFormat('italic'))

          const node = selection.anchor.getNode()
          const parent = node.getParent()
          setIsOrderedList(
            $isListNode(parent) && parent.getListType() === 'number',
          )
          setIsUnorderedList(
            $isListNode(parent) && parent.getListType() === 'bullet',
          )
        }
      })
    })
  }, [editor])

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
  }

  const insertLink = () => {
    const url = prompt('링크를 입력하세요:')
    if (url) {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const linkNode = $createLinkNode(url)
          selection.insertNodes([linkNode])
        }
      })
    }
  }

  const insertImage = () => {
    const url = prompt('이미지 URL을 입력하세요:')
    if (url) {
      editor.update(() => {
        const imageNode = $createImageNode({
          src: url,
          altText: '',
        })
        $insertNodes([imageNode])
      })
    }
  }

  const insertOrderedList = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        if (isOrderedList) {
          // 이미 번호 목록인 경우 제거
          const listNode = selection.anchor.getNode().getParent()
          if ($isListNode(listNode)) {
            listNode.remove()
          }
        } else {
          // 번호 목록 생성
          const listNode = $createListNode('number')
          const listItemNode = $createListItemNode()
          listNode.append(listItemNode)
          selection.insertNodes([listNode])
        }
      }
    })
  }

  const insertUnorderedList = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        if (isUnorderedList) {
          // 이미 글머리 기호인 경우 제거
          const listNode = selection.anchor.getNode().getParent()
          if ($isListNode(listNode)) {
            listNode.remove()
          }
        } else {
          // 글머리 기호 생성
          const listNode = $createListNode('bullet')
          const listItemNode = $createListItemNode()
          listNode.append(listItemNode)
          selection.insertNodes([listNode])
        }
      }
    })
  }

  const insertCodeBlock = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const codeNode = $createCodeNode(getDefaultCodeLanguage())
        $setBlocksType(selection, () => codeNode)
      }
    })
  }

  return (
    <div className='toolbar sticky top-0 z-10 flex items-center gap-1 border-b bg-white p-2 shadow-sm dark:bg-header'>
      <div className='group relative'>
        <button
          onClick={formatBold}
          className={`toolbar-item rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${isBold ? 'bg-gray-200 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'dark:text-gray-200'}`}
          aria-label='굵게'
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z'
            />
          </svg>
          <span className='absolute -bottom-8 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-700'>
            굵게
          </span>
        </button>
      </div>
      <div className='group relative'>
        <button
          onClick={formatItalic}
          className={`toolbar-item rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${isItalic ? 'bg-gray-200 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'dark:text-gray-200'}`}
          aria-label='기울임'
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 4h-9m4 0l-4 16m-5 0h9'
            />
          </svg>
          <span className='absolute -bottom-8 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-700'>
            기울임
          </span>
        </button>
      </div>

      <div className='mx-1 h-6 w-px bg-gray-200 dark:bg-gray-600' />

      <div className='group relative'>
        <button
          onClick={insertLink}
          className='toolbar-item rounded-md p-2 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
          aria-label='링크'
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
            />
          </svg>
          <span className='absolute -bottom-8 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-700'>
            링크
          </span>
        </button>
      </div>
      <div className='group relative'>
        <button
          onClick={insertImage}
          className='toolbar-item rounded-md p-2 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
          aria-label='이미지'
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
          <span className='absolute -bottom-8 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-700'>
            이미지
          </span>
        </button>
      </div>

      <div className='mx-1 h-6 w-px bg-gray-200 dark:bg-gray-600' />

      <div className='group relative'>
        <button
          onClick={insertOrderedList}
          className={`toolbar-item rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${isOrderedList ? 'bg-gray-200 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'dark:text-gray-200'}`}
          aria-label='번호 목록'
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M7 20h12M7 12h12M7 4h12M3 20h.01M3 12h.01M3 4h.01'
            />
          </svg>
          <span className='absolute -bottom-8 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-700'>
            번호 목록
          </span>
        </button>
      </div>
      <div className='group relative'>
        <button
          onClick={insertUnorderedList}
          className={`toolbar-item rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${isUnorderedList ? 'bg-gray-200 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'dark:text-gray-200'}`}
          aria-label='글머리 기호'
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 10h16M4 14h16M4 18h16M4 6a1 1 0 11-2 0 1 1 0 012 0zM4 10a1 1 0 11-2 0 1 1 0 012 0zM4 14a1 1 0 11-2 0 1 1 0 012 0zM4 18a1 1 0 11-2 0 1 1 0 012 0z'
            />
          </svg>
          <span className='absolute -bottom-8 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-700'>
            글머리 기호
          </span>
        </button>
      </div>
      <div className='group relative'>
        <button
          onClick={insertCodeBlock}
          className='toolbar-item rounded-md p-2 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
          aria-label='코드'
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
            />
          </svg>
          <span className='absolute -bottom-8 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block dark:bg-gray-700'>
            코드
          </span>
        </button>
      </div>
    </div>
  )
}
