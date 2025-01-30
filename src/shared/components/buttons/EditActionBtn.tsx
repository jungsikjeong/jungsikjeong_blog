'use client'

import { PencilLine } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function EditActionBtn({ className }: { className: string }) {
  return (
    <Button className={cn('', className)} size={'icon'}>
      <PencilLine className='h-4 w-4' />
    </Button>
  )
}
