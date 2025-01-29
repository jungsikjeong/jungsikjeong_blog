'use client'

import { useAuth } from '@/providers/AuthProvider'
import { Button } from '../ui/button'

export default function EditBtn() {
  const { user } = useAuth()

  if (!user?.is_admin) return null

  return (
    <Button className='w-full border dark:bg-background'>Edit profile</Button>
  )
}
