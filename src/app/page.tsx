import { NavTabs, Readme } from '@/features/main'
import MyProfile from '@/shared/components/myProfile'
import { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <NavTabs />

      <div className='relative flex flex-col px-4 md:container md:flex-row'>
        <div className='w-full md:w-[300px]'>
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
