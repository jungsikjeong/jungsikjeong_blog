import { Smile } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function StatusBtn({
  className,
  title,
}: {
  className: string
  title: string
}) {
  return (
    <Button size={'icon'} className={cn('', className)} title={title}>
      <Smile className='h-4 w-4' />
    </Button>
  )
}
