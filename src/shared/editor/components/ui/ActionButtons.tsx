import { Button } from '@/shared/components/ui/button'
import { $generateHtmlFromNodes } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot } from 'lexical'

interface IActionButtonsProps {
  onSave: (contents: string) => void
  onCancel: () => void
}

export default function ActionButtons({
  onSave,
  onCancel,
}: IActionButtonsProps) {
  const [editor] = useLexicalComposerContext()

  const handleSave = () => {
    editor.update(() => {
      const root = $getRoot()
      const htmlString = $generateHtmlFromNodes(editor)
      onSave(htmlString)
    })
  }
  return (
    <div className='mt-1 flex justify-end gap-2'>
      <Button
        onClick={handleSave}
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
  )
}
