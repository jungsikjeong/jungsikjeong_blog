'use client'

import { useGetMasterProfile } from '@/services/master_profile/useProfile'
import { nodes } from '@/shared/editor/nodes'
import CodeHighlightPlugin from '@/shared/editor/plugins/CodeHighlightPlugin'
import MarkdownPlugin from '@/shared/editor/plugins/MarkdownPlugin'
import { ToolbarPlugin } from '@/shared/editor/plugins/ToolbarPlugin'
import EditorTheme from '@/shared/editor/themes'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { LinkPlugins } from '@/shared/editor/plugins/LinkPlugins'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { Button } from '../components/ui/button'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, EditorState } from 'lexical'
import ActionButtons from './components/ui/ActionButtons'
import { useEffect, useState } from 'react'

const createInitialConfig = (initialContent?: string) => ({
  namespace: 'MyReadmeEditor',
  onError: (error: Error) => console.error(error),
  editable: true,
  nodes: nodes,
  theme: EditorTheme,
  editorState: initialContent,
})

interface IRichTextEditorProps {
  onCancel: () => void
  onSave: (contents: string) => void
  initialContent?: string
}

export default function RichTextEditor({
  onCancel,
  onSave,
  initialContent,
}: IRichTextEditorProps) {
  return (
    <>
      <LexicalComposer initialConfig={createInitialConfig(initialContent)}>
        <div className='relative'>
          <ToolbarPlugin />
          <ListPlugin />
          <RichTextPlugin
            contentEditable={
              <div className='relative'>
                <ContentEditable
                  className='editor-input relative z-10 h-[280px] overflow-y-auto px-4 py-3 text-gray-900 focus:border-none focus:outline-none focus:ring-0 dark:text-gray-100'
                  aria-placeholder='내용을 입력하세요'
                  placeholder={
                    <div className='absolute left-4 top-3 z-0 text-gray-500 dark:text-gray-400'>
                      내용을 입력하세요
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
