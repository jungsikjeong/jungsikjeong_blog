'use client'

import { Tables } from '@/types/supabase'
import Link from 'next/link'
import UserMenu from '../../auth/UserMenu'
import { Input } from '../../ui/input'
import { ThemeToggle } from '../../theme/theme-mode-toggle'
import Logo from '../../logo'
import ActionSearchBar from '../../ui/search-bar/action-search-bar'

export default function AuthHeader({ user }: { user: Tables<'members'> }) {
  return (
    <nav className='flex w-full items-center gap-2'>
      <Logo />

      <ActionSearchBar
        placeholder='Search or jump to...'
        className='absolute left-20 top-0 w-80'
      />

      <div className='ml-auto flex'>
        <ThemeToggle className='mr-4' />
        <UserMenu user={user} />
      </div>
    </nav>
  )
}
