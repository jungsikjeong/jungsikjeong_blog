'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { useAuth } from '@/hook/useAuth'
import { createClient } from '@/lib/supabase/client'

export function Header() {
  const supabase = createClient()

  const { data: me, error, isPending } = useAuth(supabase)
  console.log('me:', me)
  return (
    <header className='flex w-full items-center justify-between border-b px-4 py-3 shadow-sm sm:px-6 sm:py-4'>
      <Link href='/' className='text-lg font-bold sm:text-xl'>
        로고
      </Link>
      <Button size='sm' className='text-sm sm:px-4 sm:text-base'>
        <Link href='/auth/login'>로그인</Link>
      </Button>
    </header>
  )
}
