import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Tab } from '../types/tab'

export const useNavTab = (defaultTab: Tab = 'Overview') => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab)

  useEffect(() => {
    const currentTab = searchParams.get('tab') as Tab | null

    if (
      currentTab &&
      ['Overview', 'Repositories', 'Projects'].includes(currentTab)
    ) {
      setActiveTab(currentTab)
    } else {
      setActiveTab(defaultTab)
    }
  }, [searchParams, defaultTab])

  const switchTab = (tabName: Tab) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tabName)
    setActiveTab(tabName)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return { activeTab, switchTab }
}
