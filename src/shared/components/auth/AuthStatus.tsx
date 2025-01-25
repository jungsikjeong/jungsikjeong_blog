'use client'

import { useAuth } from '@/hook/useAuth'
import { createClient } from '@/lib/supabase/client'
import UserMenu from './UserMenu'
import LoginButton from './LoginButton'

export default function AuthStatus() {
  const supabase = createClient()
  const { data: me, error, isPending } = useAuth(supabase)

  if (error) {
    return null
  }

  if (isPending) {
    return <div>로딩중...</div>
  }

  return <div>{me ? <UserMenu user={me} /> : <LoginButton />}</div>
}
