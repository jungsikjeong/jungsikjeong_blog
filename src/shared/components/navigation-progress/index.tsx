'use client'

import * as React from 'react'
import { Progress } from '@/shared/components/ui/progress'
import { usePathname, useSearchParams } from 'next/navigation'
import { useProgressStore } from '@/stores/useProgressStore'

export function NavigationProgress() {
  const { isLoading, progress, finishLoading } = useProgressStore()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 페이지 전환이 완료되면 프로그레스바 완료
  React.useEffect(() => {
    if (isLoading) {
      finishLoading()
    }
  }, [pathname, searchParams])

  if (!isLoading) return null

  return (
    <Progress
      value={progress}
      className='fixed left-0 right-0 top-0 z-50 h-1 w-full rounded-none bg-background'
    />
  )
}
