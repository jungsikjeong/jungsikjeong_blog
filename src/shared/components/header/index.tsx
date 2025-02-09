'use client'

import { useAuth } from '@/providers/AuthProvider'
import AuthenticatedHeader from './desktop/AuthHeader'
import UnauthenticatedHeader from './desktop/UnautHeader'
import MobileAuthHeader from './mobile/AuthHeader'
import MobileUnauthHeader from './mobile/UnauthHeader'

export function Header() {
  const { user } = useAuth()

  return (
    <header className='h-[65px] bg-header px-4 py-2'>
      {/* 모바일 헤더 */}
      <div className='flex h-full md:hidden'>
        {!user ? <MobileUnauthHeader /> : <MobileAuthHeader user={user} />}
      </div>

      {/* 데스크탑 헤더 */}
      <div className='hidden md:block'>
        {!user ? (
          <UnauthenticatedHeader />
        ) : (
          <AuthenticatedHeader user={user} />
        )}
      </div>
    </header>
  )
}
