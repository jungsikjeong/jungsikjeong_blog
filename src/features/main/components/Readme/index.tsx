'use client'

import { useGetProfile } from '@/services/profile/useProfile'
import { EditActionBtn } from '@/shared/components/buttons'

export default function Readme() {
  const { data: profile } = useGetProfile()

  return (
    <div className='relative h-[390px] w-full rounded-lg border px-6 py-5'>
      <EditActionBtn className='absolute right-4 top-3' variant='ghost' />

      <div className='text-sm'>{profile.username} / README.md</div>
    </div>
  )
}
