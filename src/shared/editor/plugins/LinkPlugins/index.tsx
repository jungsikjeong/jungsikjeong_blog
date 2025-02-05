import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin'
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createLinkNode, LinkNode } from '@lexical/link'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  PASTE_COMMAND,
} from 'lexical'
import { useEffect } from 'react'

// URL 매칭을 위한 정규식
const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

// 자동 링크 변환을 위한 매처 설정
const MATCHERS = [
  (text: string) => {
    const match = URL_MATCHER.exec(text)
    return match
      ? {
          index: match.index,
          length: match[0].length,
          text: match[0],
          url: match[0].startsWith('http') ? match[0] : `https://${match[0]}`,
        }
      : null
  },
]

function ClickableLinkPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const closestLink = target.closest('a')

      if (closestLink) {
        window.open(closestLink.href, '_blank')
      }
    }

    editor.getRootElement()?.addEventListener('click', onClick)

    return () => {
      editor.getRootElement()?.removeEventListener('click', onClick)
    }
  }, [editor])

  return null
}

// 링크 붙여넣기 처리를 위한 커스텀 플러그인
function LinkPastePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        const text = event.clipboardData?.getData('text')
        if (!text || !URL_MATCHER.test(text)) return false

        const selection = $getSelection()
        if (!$isRangeSelection(selection)) return false

        event.preventDefault()
        editor.update(() => {
          const linkNode = $createLinkNode(text)
          selection.insertNodes([linkNode])
        })

        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])

  return null
}

// 통합된 링크 플러그인 컴포넌트
export function LinkPlugins() {
  return (
    <>
      <LexicalLinkPlugin />
      <AutoLinkPlugin matchers={MATCHERS} />
      <ClickableLinkPlugin />
      <LinkPastePlugin />
    </>
  )
}
