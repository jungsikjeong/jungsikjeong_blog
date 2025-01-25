'use client'

import Link from 'next/link'
import LoginBtn from '../auth/LoginButton'
import AuthStatus from '../auth/AuthStatus'

export function Header() {
  return (
    <header className='flex w-full items-center justify-between border-b px-4 py-3 shadow-sm sm:px-6 sm:py-4'>
      <Link href='/' className='text-lg font-bold sm:text-xl'>
        로고
      </Link>
      <AuthStatus />
    </header>
  )
}
