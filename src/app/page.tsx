import { NavTabs, Readme } from '@/features/main'
import { createClient } from '@/lib/supabase/server'
import { masterProfileQueryOptions } from '@/services/master_profile/queries'
import { Header } from '@/shared/components/header'
import Profile from '@/shared/components/profile'
import { getDehydratedQueries, Hydrate } from '@/utils/react-query'
import { Suspense } from 'react'

export default async function page() {
  const supabase = await createClient()

  const queries = await getDehydratedQueries([
    masterProfileQueryOptions(supabase).getMasterProfile(),
  ])

  return (
    <section>
      <Header />
      <NavTabs />

      <div className='py-4'>
        <div className='relative flex flex-col px-4 md:container md:flex-row'>
          <div className='w-full md:w-[300px]'>
            <Hydrate state={{ queries }}>
              <Profile />
            </Hydrate>
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
