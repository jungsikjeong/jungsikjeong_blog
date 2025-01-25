'use client'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface ILogoutButtonProps {
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
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

export default function LogoutButton({
  size,
  variant,
  className,
}: ILogoutButtonProps) {
  const router = useRouter()
  const supabase = createClient()

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={async () => {
        try {
          await supabase.auth.signOut()
          router.push('/')
        } catch (error) {
          console.error('로그아웃 중 에러 발생:', error)
        }
      }}
    >
      로그아웃
    </Button>
  )
}
