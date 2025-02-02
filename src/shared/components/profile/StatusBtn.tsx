'use client'

import { useAuth } from '@/providers/AuthProvider'
import { Smile } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function StatusBtn({
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

  if (!user?.is_admin) return null

  return (
    <Button
      size={'icon'}
      className={cn('', className)}
      title={title}
      onClick={onClick}
    >
      {profileStatus ? (
        <span className='h-4 w-4'>{profileStatus}</span>
      ) : (
        <Smile className='h-4 w-4' />
      )}
    </Button>
  )
}
