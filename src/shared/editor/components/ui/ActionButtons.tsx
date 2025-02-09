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
import { useImageHandler } from '../../hooks/useImageHandler'

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
  const {
    extractImageUrls,
    uploadNewImages,
    cleanupUnusedImages,
    getImageFileName,
  } = useImageHandler()

  const handleSave = async () => {
    try {
      setIsSaving(true)

      // 현재 에디터의 HTML 가져오기
      let currentHtmlString = ''
      editor.update(() => {
        currentHtmlString = $generateHtmlFromNodes(editor)
      })

      const parser = new DOMParser()
      const doc = parser.parseFromString(currentHtmlString, 'text/html')
      const imgTags = Array.from(doc.getElementsByTagName('img'))

      // 이미지 업로드 처리
      const results = await uploadNewImages(imgTags)

      // HTML 문자열 업데이트
      let finalHtml = currentHtmlString
      results.forEach((result) => {
        if (result) {
          finalHtml = finalHtml.replace(result.src, result.url)
        }
      })

      // 불필요한 이미지 정리
      const currentImageUrls = extractImageUrls(finalHtml)
        .filter((url) => url.includes('supabase.co'))
        .map(getImageFileName)

      await cleanupUnusedImages(currentImageUrls)
      await onSave(finalHtml)

      // 저장 후 1초대기해서 onSave()의 콜백으로 편집에디터 닫힐때까지 기다리기
      await new Promise((resolve) => setTimeout(resolve, 1000))
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
