'use client'

import { Button } from '@/shared/components/ui/button'
import { $generateHtmlFromNodes } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot } from 'lexical'
import { useState } from 'react'
import { $isImageNode, ImageNode } from '../../nodes/ImageNode/ImageNode'
import { uploadReadmeImageToStorage } from '@/utils/supabase/storage'
import useCreateClient from '@/lib/supabase/client'
import { toast } from 'sonner'

interface IActionButtonsProps {
  onSave: (contents: string) => void
  onCancel: () => void
}

export default function ActionButtons({
  onSave,
  onCancel,
}: IActionButtonsProps) {
  const [editor] = useLexicalComposerContext()
  const [isSaving, setIsSaving] = useState(false)

  const supabase = useCreateClient()

  const handleSave = async () => {
    try {
      setIsSaving(true)

      let htmlString = ''
      editor.update(() => {
        htmlString = $generateHtmlFromNodes(editor)
      })

      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlString, 'text/html')
      const imgTags = Array.from(doc.getElementsByTagName('img'))

      // 이미지 업로드 처리
      const uploadPromises = imgTags.map(async (img) => {
        const src = img.src
        if (src.startsWith('data:image')) {
          try {
            const blob = await fetch(src).then((r) => r.blob())
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
            const url = await uploadReadmeImageToStorage(
              file,
              'master',
              supabase,
            )
            return { src, url }
          } catch (error) {
            console.error('Image upload failed:', error)
            throw error
          }
        }
        return null
      })

      const results = await Promise.all(uploadPromises)

      // HTML 문자열에서 base64 이미지 URL을 실제 URL로 교체
      let finalHtml = htmlString
      results.forEach((result) => {
        if (result) {
          finalHtml = finalHtml.replace(result.src, result.url)
        }
      })

      onSave(finalHtml)
    } catch (error) {
      console.error('Save failed:', error)
      toast.error('저장 중 오류가 발생했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='mt-1 flex justify-end gap-2'>
      <Button
        onClick={handleSave}
        disabled={isSaving}
        className='h-7 bg-blue-600 text-sm text-white hover:bg-blue-700'
      >
        {isSaving ? 'Saving...' : 'Save'}
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
