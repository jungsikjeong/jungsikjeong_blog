'use client'

import { useAuth } from '@/providers/AuthProvider'
import AuthenticatedHeader from './AuthenticatedHeader'
import UnauthenticatedHeader from './UnauthenticatedHeader'

export function Header() {
  const { user } = useAuth()

  return (
    <header className='h-[65px] bg-neutral-800 px-4 py-2'>
      {!user ? <UnauthenticatedHeader /> : <AuthenticatedHeader user={user} />}
    </header>
  )
}
