import { createClient } from '@/lib/supabase/server'
import { profileQueryOptions } from '@/services/profile/queries'
import Profile from '@/shared/components/profile'
import { getDehydratedQueries, Hydrate } from '@/utils/react-query'
import { getCurrentUser } from '@/utils/supabase/auth'
import React, { Suspense } from 'react'

export default async function layout({ children }: React.PropsWithChildren) {
  const supabase = await createClient()
  const user = await getCurrentUser()
  const queries = await getDehydratedQueries([
    profileQueryOptions(supabase).getProfileByMemberId(),
  ])

  return (
    <div>
      <div className='py-4'>
        <div className='relative flex flex-col px-4 md:container md:flex-row'>
          <Hydrate state={{ queries }}>
            <div className='w-full md:w-[300px]'>
              <Suspense fallback={<div>Loading...</div>}>
                <Profile user={user} />
              </Suspense>
            </div>

            <div className='ml-0 mt-4 flex-1 md:ml-8'>{children}</div>
          </Hydrate>
        </div>
      </div>
    </div>
  )
}
