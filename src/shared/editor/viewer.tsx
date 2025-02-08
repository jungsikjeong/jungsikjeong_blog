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
import HTMLImportPlugin from './plugins/HTMLImportPlugin/HTMLImportPlugin'

interface IRichTextViewerProps {
  htmlContent: string | null
}

const initialConfig = {
  namespace: 'LexicalViewer',
  editable: false,
  onError: (error: any) => {
    console.error(error)
  },
  nodes: nodes,
  readOnly: true,
  disableImageEdit: true,
} as const

export default function RichTextViewer({ htmlContent }: IRichTextViewerProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
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
        <HTMLImportPlugin htmlString={htmlContent as string} />
      </div>
    </LexicalComposer>
  )
}
