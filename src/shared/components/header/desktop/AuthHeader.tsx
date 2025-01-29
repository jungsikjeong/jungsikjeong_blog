'use client'

import { Tables } from '@/types/supabase'
import Link from 'next/link'
import UserMenu from '../../auth/UserMenu'
import { Input } from '../../ui/input'
import { ThemeToggle } from '../../theme/theme-mode-toggle'
import Logo from '../../logo'

export default function AuthHeader({ user }: { user: Tables<'members'> }) {
  return (
    <nav className='flex items-center gap-2'>
      <Logo />

      <Input
        type='text'
        placeholder='Search or jump to...'
        className='h-8 w-60 text-sm'
      />

      <div className='ml-auto flex'>
        <ThemeToggle className='mr-4' />
        <UserMenu user={user} />
      </div>
    </nav>
  )
}
