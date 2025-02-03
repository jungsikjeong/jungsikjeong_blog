'use client'

import { useAuth } from '@/providers/AuthProvider'
import { Button } from '../ui/button'
import { PencilLine } from 'lucide-react'
import { useState } from 'react'
import { Label } from '../ui/label'

export default function ProfileImageChangeButton({
  className,
}: {
  className: string
}) {
  const { user, setUser } = useAuth()

  if (!user?.is_admin) return null

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
