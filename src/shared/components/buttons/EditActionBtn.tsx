'use client'

import { PencilLine } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function EditActionBtn({
  className,
  variant,
}: {
  className: string
  variant?: 'ghost' | 'default'
}) {
  return (
    <Button className={cn('', className)} size={'icon'} variant={variant}>
      <PencilLine className='h-4 w-4' />
    </Button>
  )
}
