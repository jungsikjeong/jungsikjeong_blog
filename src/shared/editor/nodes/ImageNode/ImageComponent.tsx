import type { NodeKey, LexicalEditor } from 'lexical'
import type { JSX } from 'react'
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import { mergeRegister } from '@lexical/utils'
import * as React from 'react'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'

export const RIGHT_CLICK_IMAGE_COMMAND = createCommand(
  'RIGHT_CLICK_IMAGE_COMMAND',
)

const imageCache = new Set()

function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        imageCache.add(src)
        resolve(null)
      }
      img.onerror = () => {
        imageCache.add(src)
      }
    })
  }
}

export default function ImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
  resizable,
}: {
  altText: string
  height: 'inherit' | number
  maxWidth: number
  nodeKey: NodeKey
  resizable: boolean
  src: string
  width: 'inherit' | number
}): JSX.Element {
  const imageRef = useRef<null | HTMLImageElement>(null)
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [editor] = useLexicalComposerContext()
  const [isLoadError, setIsLoadError] = useState<boolean>(false)

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (isResizing) return true
      if (event.target === imageRef.current) {
        if (event.shiftKey) {
          setSelected(!isSelected)
        } else {
          clearSelection()
          setSelected(true)
        }
        return true
      }
      return false
    },
    [isResizing, isSelected, setSelected, clearSelection],
  )

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerCommand(
        RIGHT_CLICK_IMAGE_COMMAND,
        onClick,
        COMMAND_PRIORITY_LOW,
      ),
    )

    return () => {
      unregister()
    }
  }, [editor, onClick])

  return (
    <Suspense fallback={null}>
      <div>
        <img
          className={isSelected ? 'focused' : ''}
          src={src}
          alt={altText}
          ref={imageRef}
          style={{
            height,
            maxWidth,
            width,
          }}
          onError={() => setIsLoadError(true)}
          draggable='false'
        />
      </div>
    </Suspense>
  )
}
