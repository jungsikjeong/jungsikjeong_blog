import { NavTabs } from '@/features/main'
import { Header } from '@/shared/components/header'
import MyProfile from '@/shared/components/myProfile'
import React from 'react'

export default function page() {
  return (
    <div>
      <Header />
      <NavTabs />
      <MyProfile />
    </div>
  )
}
