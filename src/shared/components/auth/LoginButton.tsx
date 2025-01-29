'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'

interface ILoginButtonProps {
  size?: 'sm' | 'lg' | 'default' | 'icon' | null | undefined
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined
  className?: string
}

export default function LoginButton({
  size = 'default',
  variant = 'default',
  className,
}: ILoginButtonProps) {
  return (
    <Button
      size={size}
      variant={variant}
      className={cn('text-sm sm:px-4 sm:text-base', className)}
    >
      <Link href='/auth/login'>Sign in</Link>
    </Button>
  )
}
