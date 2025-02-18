'use client'

import { nodes } from '@/shared/editor/nodes'
import CodeHighlightPlugin from '@/shared/editor/plugins/CodeHighlightPlugin'
import { LinkPlugins } from '@/shared/editor/plugins/LinkPlugins'
import MarkdownPlugin from '@/shared/editor/plugins/MarkdownPlugin'
import { ToolbarPlugin } from '@/shared/editor/plugins/ToolbarPlugin'
import EditorTheme from '@/shared/editor/themes'
import { $generateNodesFromDOM } from '@lexical/html'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { $getRoot, LexicalEditor } from 'lexical'
import ActionButtons from './components/ui/ActionButtons'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'

const createInitialConfig = (initialContent?: string) => ({
  namespace: 'MyReadmeEditor',
  onError: (error: Error) => console.error(error),
  editable: true,
  nodes: nodes,
  theme: EditorTheme,
  editorState: (editor: LexicalEditor) => {
    if (initialContent) {
      const parser = new DOMParser()
      const dom = parser.parseFromString(initialContent, 'text/html')
      const nodes = $generateNodesFromDOM(editor, dom)

      const root = $getRoot()
      root.clear()
      root.append(...nodes)
    }
  },
})

interface IRichTextEditorProps {
  onCancel: () => void
  onSave: (contents: string) => void
  defaultContent?: string
  placeholder: string
}

export default function RichTextEditor({
  onCancel,
  onSave,
  placeholder,
  defaultContent,
}: IRichTextEditorProps) {
  return (
    <>
      <LexicalComposer initialConfig={createInitialConfig(defaultContent)}>
        <div className='relative mt-4 rounded-md border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'>
          <ToolbarPlugin />
          <ListPlugin />
          <RichTextPlugin
            contentEditable={
              <div className='relative'>
                <ContentEditable
                  className='editor-input relative z-10 h-[280px] overflow-y-auto px-4 py-3 text-gray-900 focus:outline-none dark:text-gray-100'
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className='absolute left-4 top-3 z-0 text-gray-500 dark:text-gray-400'>
                      {placeholder}
                    </div>
                  }
                />
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <LinkPlugins />
          <FloatingLinkEditorPlugin />
          <CodeHighlightPlugin />
          <MarkdownPlugin />
        </div>

        <ActionButtons onSave={onSave} onCancel={onCancel} />
      </LexicalComposer>
    </>
  )
}
