'use client'

import { useAuth } from '@/providers/AuthProvider'
import { Smile } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function ProfileStatusButton({
  className,
  title,
  onClick,
  profileStatus,
}: {
  className: string
  title: string
  onClick?: () => void
  profileStatus: string | null
}) {
  const { user } = useAuth()

  return (
    <Button
      size={'icon'}
      className={cn('', className)}
      title={user?.is_admin ? title : '현재 상태'}
      onClick={user?.is_admin ? onClick : undefined}
    >
      {profileStatus ? (
        <span className='text-sm md:text-2xl'>{profileStatus}</span>
      ) : (
        <Smile className='h-4 w-4' />
      )}
    </Button>
  )
}
