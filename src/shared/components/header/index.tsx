'use client'

import Link from 'next/link'
import AuthStatus from '../auth/AuthStatus'
import { ModeToggle } from '../theme/theme-mode-toggle'

export function Header() {
  return (
    <header className='flex w-full items-center justify-between border-b px-4 py-3 shadow-sm sm:px-6 sm:py-4'>
      <Link href='/' className='text-lg font-bold sm:text-xl'>
        로고
      </Link>

      <div className='flex items-center gap-2'>
        <ModeToggle />
        <AuthStatus />
      </div>
    </header>
  )
}
