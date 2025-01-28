'use client'

import { Button } from '@/shared/components/ui/button'
import { Tab } from '../../types/tab'
import { useNavTab } from '../../hooks/useNavTab'

const TABS: Tab[] = ['Overview', 'Repositories', 'Projects']

export default function NavTabs() {
  const { activeTab, switchTab } = useNavTab('Overview')

  return (
    <nav className='flex border-b border-border'>
      {TABS.map((tab) => (
        <Button
          key={tab}
          className={`px-4 py-2 ${
            activeTab === tab ? 'border-b-2 border-orange-500' : ''
          }`}
          onClick={() => switchTab(tab)}
        >
          {tab}
        </Button>
      ))}
    </nav>
  )
}
