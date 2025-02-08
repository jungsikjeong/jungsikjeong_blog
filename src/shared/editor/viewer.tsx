'use client'

import { nodes } from '@/shared/editor/nodes'
import CodeHighlightPlugin from '@/shared/editor/plugins/CodeHighlightPlugin'
import MarkdownPlugin from '@/shared/editor/plugins/MarkdownPlugin'
import EditorTheme from '@/shared/editor/themes'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { $getRoot, $createParagraphNode, LexicalEditor } from 'lexical'
import { $generateNodesFromDOM } from '@lexical/html'

const createViewerConfig = (content: string | null) => ({
  namespace: 'MyReadmeViewer',
  onError: (error: Error) => console.error(error),
  editable: false,
  nodes: nodes,
  theme: EditorTheme,
  editorState: (editor: LexicalEditor) => {
    editor.update(() => {
      if (!content) {
        const paragraph = $createParagraphNode()
        $getRoot().append(paragraph)
        return
      }

      const parser = new DOMParser()
      const dom = parser.parseFromString(content, 'text/html')
      const nodes = $generateNodesFromDOM(editor, dom)
      const root = $getRoot()
      root.clear()
      nodes.forEach((node) => root.append(node))
    })
  },
})

interface IRichTextViewerProps {
  content: string | null
}

export default function RichTextViewer({ content }: IRichTextViewerProps) {
  return (
    <LexicalComposer initialConfig={createViewerConfig(content)}>
      <div className='relative'>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className='viewer-content relative z-10 py-3 text-gray-900 dark:text-gray-100' />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <CodeHighlightPlugin />
        <MarkdownPlugin />
      </div>
    </LexicalComposer>
  )
}
