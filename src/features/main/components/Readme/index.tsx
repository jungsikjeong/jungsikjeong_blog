'use client'

import { useGetProfile } from '@/services/profile/useProfile'
import { EditActionBtn } from '@/shared/components/buttons'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { ToolbarPlugin } from '@/shared/editor/plugins/ToolbarPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import CodeHighlightPlugin from '@/shared/editor/plugins/CodeHighlightPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListNode, ListItemNode } from '@lexical/list'
import { CodeNode, CodeHighlightNode } from '@lexical/code'
import { LinkNode } from '@lexical/link'
import MarkdownPlugin from '@/shared/editor/plugins/MarkdownPlugin'
import { ImageNode } from '@/shared/editor/nodes/ImageNode/ImageNode'
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import EditorTheme from '@/shared/editor/themes'
import { nodes } from '@/shared/editor/nodes'

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
              <ContentEditable className='editor-input h-[300px] overflow-y-auto px-4 py-3' />
            }
            placeholder={
              <div className='editor-placeholder'>내용을 입력하세요...</div>
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
