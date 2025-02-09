import { useCallback } from 'react'
import { uploadReadmeImageToStorage } from '@/utils/supabase/storage'
import useCreateClient from '@/lib/supabase/client'

export const useImageHandler = () => {
  const supabase = useCreateClient()

  const getImageFileName = (url: string) => {
    const parts = url.split('/')
    return parts[parts.length - 1] // 파일이름과 확장자를 가져옴 ex: photo.jpg
  }

  const extractImageUrls = (html: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const imgTags = Array.from(doc.getElementsByTagName('img'))
    return imgTags.map((img) => img.src)
  }

  const uploadNewImages = async (imgTags: HTMLImageElement[]) => {
    const uploadPromises = imgTags.map(async (img) => {
      const src = img.src
      if (src.startsWith('data:image')) {
        try {
          const blob = await fetch(src).then((r) => r.blob())
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
          const url = await uploadReadmeImageToStorage(file, 'master', supabase)
          return { src, url }
        } catch (error) {
          console.error('Image upload failed:', error)
          throw error
        }
      }
      return null
    })

    return Promise.all(uploadPromises)
  }

  const cleanupUnusedImages = async (currentImageUrls: string[]) => {
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
  }

  return {
    getImageFileName,
    extractImageUrls,
    uploadNewImages,
    cleanupUnusedImages,
  }
}
