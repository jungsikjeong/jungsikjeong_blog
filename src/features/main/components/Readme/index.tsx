'use client'

import { useGetProfile } from '@/services/profile/useProfile'
import { nodes } from '@/shared/editor/nodes'
import CodeHighlightPlugin from '@/shared/editor/plugins/CodeHighlightPlugin'
import MarkdownPlugin from '@/shared/editor/plugins/MarkdownPlugin'
import PlaceholderPlugin from '@/shared/editor/plugins/PlaceholderPlugin'
import { ToolbarPlugin } from '@/shared/editor/plugins/ToolbarPlugin'
import EditorTheme from '@/shared/editor/themes'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

const initialConfig = {
  namespace: 'MyReadmeEditor',
  onError: (error: Error) => console.error(error),
  editable: true,
  nodes: nodes,
  theme: EditorTheme,
}

export default function Readme() {
  const { data: profile } = useGetProfile()

  return (
    <div className='relative h-[390px] w-full rounded-lg border px-6 py-5'>
      <div className='text-sm'>{profile?.username} / README.md</div>

      <LexicalComposer initialConfig={initialConfig}>
        <div className='relative'>
          <ToolbarPlugin />
          <ListPlugin />
          <RichTextPlugin
            contentEditable={
              <div className='relative'>
                <ContentEditable className='editor-input h-[280px] overflow-y-auto px-4 py-3 text-gray-900 focus:border-none focus:outline-none focus:ring-0 dark:text-gray-100' />
                <PlaceholderPlugin />
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <LinkPlugin />
          <CodeHighlightPlugin />
          <MarkdownPlugin />
        </div>
      </LexicalComposer>

      {/* <EditActionBtn className='absolute right-4 top-4' /> */}
    </div>
  )
}
