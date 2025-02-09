'use client'

import { Tables } from '@/types/supabase'
import UserMenu from '../../auth/UserMenu'
import { ThemeToggle } from '../../theme/theme-mode-toggle'
import MobileMenu from '../../menu/MobileMenu'

export default function AuthHeader({ user }: { user: Tables<'members'> }) {
  return (
    <div className='flex w-full items-center justify-between'>
      <MobileMenu user={user} />

      <div className='ml-auto flex'>
        <ThemeToggle className='mr-4' />
        <UserMenu user={user} />
      </div>
    </div>
  )
}
