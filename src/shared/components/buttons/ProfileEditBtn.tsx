'use client'

import { useAuth } from '@/providers/AuthProvider'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface IProfileEditBtnProps {
  onAction: () => void
  className?: string
}
export default function ProfileEditBtn({
  onAction,
  className,
}: IProfileEditBtnProps) {
  const { user } = useAuth()

  if (!user?.is_admin) return null

  return (
    <Button className={cn('w-full border', className)} onClick={onAction}>
      Edit profile
    </Button>
  )
}
