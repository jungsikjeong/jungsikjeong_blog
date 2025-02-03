'use client'

import { useGetMasterProfile } from '@/services/master_profile/useProfile'
import { EditActionBtn } from '@/shared/components/buttons'
import RichTextEditor from '@/shared/editor'
import { useState } from 'react'

export default function Readme() {
  const { data: profile } = useGetMasterProfile()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className='relative h-[390px] w-full rounded-lg border px-6 py-5'>
      {isEditing ? (
        <RichTextEditor
          onCancel={() => setIsEditing(false)}
          onSave={() => console.log('저장')}
        />
      ) : (
        <>
          <div className='text-sm'>{profile?.username} / README.md</div>

          <EditActionBtn
            className='absolute right-4 top-4'
            variant='ghost'
            onClick={() => setIsEditing(true)}
            title='편집'
          />
        </>
      )}
    </div>
  )
}
