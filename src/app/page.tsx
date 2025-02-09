import { NavTabs, Readme } from '@/features/main'
import { createClient } from '@/lib/supabase/server'
import { masterProfileQueryOptions } from '@/services/master_profile/queries'
import { masterReadmeQueryOptions } from '@/services/master_readme/queries'
import { Header } from '@/shared/components/header'
import Profile from '@/shared/components/profile'
import { getDehydratedQueries, Hydrate } from '@/utils/react-query'
import { getCurrentUser } from '@/utils/supabase/auth'
import { Suspense } from 'react'

export default async function page() {
  const supabase = await createClient()

  const user = await getCurrentUser()

  const queries = await getDehydratedQueries([
    masterProfileQueryOptions(supabase).getMasterProfile(),
    masterReadmeQueryOptions(supabase).getMasterReadme(),
  ])

  return (
    <section>
      <Header />
      <NavTabs />

      <div className='py-4'>
        <div className='relative flex flex-col px-4 md:container md:flex-row'>
          <Hydrate state={{ queries }}>
            <div className='w-full md:w-[300px]'>
              <Suspense fallback={<div>Loading...</div>}>
                <Profile user={user} />
              </Suspense>
            </div>

            <div className='ml-0 mt-4 flex-1 md:ml-8'>
              <Suspense fallback={<div>Loading...</div>}>
                <Readme user={user} />
              </Suspense>
            </div>
          </Hydrate>
        </div>
      </div>
    </section>
  )
}
