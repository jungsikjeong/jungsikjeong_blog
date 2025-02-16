import { createClient } from '@/lib/supabase/server'
import { masterProfileQueryOptions } from '@/services/master_profile/queries'
import Profile from '@/shared/components/profile'
import { getDehydratedQueries, Hydrate } from '@/utils/react-query'
import { getCurrentUser } from '@/utils/supabase/auth'
import React, { Suspense } from 'react'
import RepositoriesPage from './page'
import { NavTabs } from '@/features/main'

export default async function layout({ children }: React.PropsWithChildren) {
  const supabase = await createClient()
  const user = await getCurrentUser()
  const queries = await getDehydratedQueries([
    masterProfileQueryOptions(supabase).getMasterProfile(),
  ])

  return (
    <>
      <NavTabs />
      <section className='py-4'>
        <div className='relative flex flex-col px-4 md:container md:flex-row'>
          <Hydrate state={{ queries }}>
            <div className='w-full md:w-[300px]'>
              <Suspense fallback={<div>Loading...</div>}>
                <Profile user={user} />
              </Suspense>
            </div>

            <div className='ml-0 mt-4 flex-1 md:ml-8'>
              <Suspense fallback={<div>Loading...</div>}>
                <RepositoriesPage user={user} />
              </Suspense>
            </div>
          </Hydrate>
        </div>
      </section>
    </>
  )
}
