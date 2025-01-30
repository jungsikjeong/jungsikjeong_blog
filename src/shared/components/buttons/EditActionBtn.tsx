'use client'

import { PencilLine } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function EditActionBtn({
  className,
  variant,
  onClick,
  title,
}: {
  className: string
  variant?: 'ghost' | 'default'
  onClick?: () => void
  title?: string
}) {
  return (
    <Button
      className={cn('', className)}
      size={'icon'}
      variant={variant}
      onClick={onClick}
      title={title}
    >
      <PencilLine className='h-4 w-4' />
    </Button>
  )
}
