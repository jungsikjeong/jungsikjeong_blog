'use client'

import { Tables } from '@/types/supabase'

export default function UserMenu({ user }: { user: Tables<'members'> }) {
  return <div>{user.nickname}</div>
}
