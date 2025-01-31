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
import { Button } from '../components/ui/button'

const initialConfig = {
  namespace: 'MyReadmeEditor',
  onError: (error: Error) => console.error(error),
  editable: true,
  nodes: nodes,
  theme: EditorTheme,
}

interface IRichTextEditorProps {
  onCancel: () => void
  onSave: () => void
}

export default function RichTextEditor({
  onCancel,
  onSave,
}: IRichTextEditorProps) {
  return (
    <>
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

      <div className='mt-1 flex justify-end gap-2'>
        <Button
          onClick={onSave}
          className='h-7 bg-blue-600 text-sm text-white hover:bg-blue-700'
        >
          Save
        </Button>
        <Button
          onClick={onCancel}
          variant='outline'
          className='bg- h-7 text-sm text-gray-600 hover:bg-hover-bg'
        >
          Cancel
        </Button>
      </div>
    </>
  )
}
