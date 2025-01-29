import { NavTabs, Readme } from '@/features/main'
import { Header } from '@/shared/components/header'
import MyProfile from '@/shared/components/myProfile'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <Header />
      <NavTabs />

      <div className='relative flex flex-col px-4 md:container md:flex-row'>
        <div className='w-[300px]'>
          <MyProfile />
        </div>

        <div className='ml-0 mt-4 flex-1 md:ml-8'>
          <Suspense fallback={<div>Loading...</div>}>
            <Readme />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
