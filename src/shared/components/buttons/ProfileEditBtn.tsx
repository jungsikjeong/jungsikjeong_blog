'use client'

import { useAuth } from '@/providers/AuthProvider'
import { Button } from '../ui/button'

export default function ProfileEditBtn() {
  const { user } = useAuth()

  if (!user?.is_admin) return null

  return <Button className='w-full border'>Edit profile</Button>
}
