import { $generateNodesFromDOM } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createParagraphNode, $getRoot } from 'lexical'
import { useEffect } from 'react'

// HTML을 Lexical 노드로 변환하는 플러그인
function HTMLImportPlugin({ htmlString }: { htmlString: string }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      // 기존 내용을 초기화
      const root = $getRoot()
      root.clear()

      if (htmlString) {
        // HTML 문자열을 DOM으로 파싱
        const parser = new DOMParser()
        const dom = parser.parseFromString(htmlString, 'text/html')

        // DOM을 Lexical 노드로 변환
        const nodes = $generateNodesFromDOM(editor, dom)

        // 노드를 에디터에 삽입
        if (nodes.length === 0) {
          const paragraph = $createParagraphNode()
          root.append(paragraph)
        } else {
          nodes.forEach((node) => root.append(node))
        }
      }
    })
  }, [editor, htmlString])

  return null
}

export default HTMLImportPlugin
