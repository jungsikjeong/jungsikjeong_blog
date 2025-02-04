'use client'

import { useAuth } from '@/providers/AuthProvider'
import { Button } from '../ui/button'
import { PencilLine } from 'lucide-react'
import { useState } from 'react'
import { Label } from '../ui/label'
import { uploadFile } from '@/utils/supabase/storage'
import useCreateClient from '@/lib/supabase/client'
import { useUpdateMasterProfileImage } from './hooks/useUpdateMasterProfileImage'
import { v4 as uuid } from 'uuid'

export default function ProfileImageChangeButton({
  className,
}: {
  className: string
}) {
  const { user, setUser } = useAuth()
  const supabase = useCreateClient()
  const updateImage = useUpdateMasterProfileImage()

  if (!user?.is_admin) return null

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.')
        return
      }

      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setUser({ ...user, avatar_url: reader.result as string })
      }
      reader.readAsDataURL(file)

      const res = await uploadFile({
        file,
        newPath: `master/${uuid()}`,
        oldPath: user.avatar_url ?? '',
        supabase,
      })

      updateImage.mutate(res as string)
    }
  }
  return (
    <Label
      htmlFor='file'
      className={`inline-flex cursor-pointer items-center justify-center rounded-md ${className}`}
      title={'set Image'}
    >
      <PencilLine className='h-3 w-3 md:h-4 md:w-4' />
      <input
        type='file'
        id='file'
        className='hidden'
        accept='image/*'
        onChange={handleImageChange}
      />
    </Label>
  )
}
