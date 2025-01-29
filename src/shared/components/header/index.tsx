'use client'

import { useAuth } from '@/providers/AuthProvider'
import UnauthenticatedHeader from './desktop/UnautHeader'
import AuthenticatedHeader from './desktop/AuthHeader'
import MobileAuthHeader from './mobile/AuthHeader'
import MobileUnauthHeader from './mobile/UnauthHeader'

export function Header() {
  const { user } = useAuth()

  return (
    <header className='h-[65px] bg-header px-4 py-2'>
      {/* 모바일 헤더 */}
      <div className='block sm:hidden'>
        {!user ? <MobileUnauthHeader /> : <MobileAuthHeader user={user} />}
      </div>

      {/* 데스크탑 헤더 */}
      <div className='hidden sm:block'>
        {!user ? (
          <UnauthenticatedHeader />
        ) : (
          <AuthenticatedHeader user={user} />
        )}
      </div>
    </header>
  )
}
