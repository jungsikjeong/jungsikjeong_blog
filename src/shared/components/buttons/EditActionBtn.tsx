'use client'

import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '../ui/button'

export default function EditActionBtn({
  className,
  variant,
  onClick,
  title,
  tooltip,
}: {
  className: string
  variant?: 'ghost' | 'default'
  onClick?: () => void
  title?: string | React.ReactNode
  tooltip?: string
}) {
  const { user } = useAuth()

  if (!user?.is_admin) return null

  return (
    <Button
      className={cn('', className)}
      size={'icon'}
      variant={variant}
      onClick={onClick}
      title={tooltip}
    >
      {title}
    </Button>
  )
}
