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

  // 이미지 URL에서 파일 이름 추출하는 함수
  const getImageFileName = (url: string) => {
    const parts = url.split('/')
    return parts[parts.length - 1]
  }

  // HTML 문자열에서 모든 이미지 URL 추출
  const extractImageUrls = (html: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const imgTags = Array.from(doc.getElementsByTagName('img'))
    return imgTags.map((img) => img.src)
  }

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

      // 새로운 base64 이미지 업로드 처리
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
      let finalHtml = currentHtmlString
      results.forEach((result) => {
        if (result) {
          finalHtml = finalHtml.replace(result.src, result.url)
        }
      })

      // 이전 이미지와 현재 이미지 URL 비교
      const currentImageUrls = extractImageUrls(finalHtml)
        .filter((url) => url.includes('supabase.co')) // Supabase 이미지만 필터링
        .map(getImageFileName)

      // Storage에서 불필요한 이미지 삭제
      const { data: existingFiles } = await supabase.storage
        .from('readme')
        .list('master')

      if (existingFiles) {
        const deletePromises = existingFiles
          .filter((file) => !currentImageUrls.includes(file.name))
          .map((file) =>
            supabase.storage.from('readme').remove([`master/${file.name}`]),
          )

        await Promise.all(deletePromises)
      }

      await onSave(finalHtml)

      // 상태 업데이트와 라우팅이 완료될 때까지 약간의 지연 추가
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
