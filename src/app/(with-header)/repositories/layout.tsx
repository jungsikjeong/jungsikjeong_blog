import { createClient } from '@/lib/supabase/server'
import { masterProfileQueryOptions } from '@/services/master_profile/queries'
import Profile from '@/shared/components/profile'
import { getDehydratedQueries, Hydrate } from '@/utils/react-query'
import { getCurrentUser } from '@/utils/supabase/auth'
import React, { Suspense } from 'react'

export default async function layout({ children }: React.PropsWithChildren) {
  const supabase = await createClient()
  const user = await getCurrentUser()
  const queries = await getDehydratedQueries([
    masterProfileQueryOptions(supabase).getMasterProfile(),
  ])

  return (
    <div>
      <div className='py-4'>
        <div className='relative grid grid-cols-1 gap-4 px-4 md:container md:grid-cols-3'>
          <Hydrate state={{ queries }}>
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <Profile user={user} />
              </Suspense>
            </div>

            <div className='col-span-2'>{children}</div>
          </Hydrate>
        </div>
      </div>
    </div>
  )
}
