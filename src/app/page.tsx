import { NavTabs, Readme } from '@/features/main'
import { Header } from '@/shared/components/header'
import Profile from '@/shared/components/profile'
import { Suspense } from 'react'

export default function page() {
  return (
    <section>
      <Header />
      <NavTabs />

      <div className='py-4'>
        <div className='relative flex flex-col px-4 md:container md:flex-row'>
          <div className='w-full md:w-[300px]'>
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          </div>

          <div className='ml-0 mt-4 flex-1 md:ml-8'>
            <Suspense fallback={<div>Loading...</div>}>
              <Readme />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
