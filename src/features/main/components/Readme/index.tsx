'use client'

import { useGetProfile } from '@/services/profile/useProfile'

export default function Readme() {
  const { data: profile } = useGetProfile()

  return (
    <div className='h-[390px] w-full rounded-lg border px-6 py-5'>
      <div className='text-sm'>{profile.username} / README.md</div>
    </div>
  )
}
