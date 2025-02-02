'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import CONFIG from '@/config'
import * as gtag from '../lib/gtag'

const useGtagEffect = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!(CONFIG.isProd && CONFIG?.googleAnalytics?.enable)) return

    // URL이 변경될 때마다 pageview 이벤트 발생
    const url = pathname + searchParams.toString()
    gtag.pageview(url)
  }, [pathname, searchParams])

  return null
}

export default useGtagEffect
