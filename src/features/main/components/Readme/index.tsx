'use client'

import { useGetProfileByMemberId } from '@/services/profile/useProfile'
import { useGetMasterReadme } from '@/services/readme/useReadme'
import { EditActionBtn } from '@/shared/components/buttons'
import RichTextEditor from '@/shared/editor'
import { useState } from 'react'
import { useUpdateReadme } from './hooks/useUpdateReadme'
import { useAuth } from '@/providers/AuthProvider'
import { Tables } from '@/types/supabase'
import RichTextViewer from '@/shared/editor/viewer'

export default function Readme({ user }: { user: Tables<'members'> | null }) {
  const { data: profile } = useGetProfileByMemberId(
    user ? user.id : (process.env.NEXT_PUBLIC_ADMIN_ID as string),
  )
  const { data: readme } = useGetMasterReadme()
  const updateReadme = useUpdateReadme()

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = (contents: string) => {
    if (!user) {
      return alert('로그인 후 이용해주세요.')
    }

    updateReadme.mutate(
      {
        contents: contents,
        email: user.email,
      },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      },
    )
  }

  return (
    <div className='relative h-[390px] w-full overflow-auto rounded-lg border px-6 pb-5'>
      {isEditing ? (
        <RichTextEditor
          placeholder='내용을 입력하세요'
          defaultContent={readme?.contents as string}
          onCancel={() => setIsEditing(false)}
          onSave={(contents: string) => handleSave(contents)}
        />
      ) : (
        <>
          <div className='sticky top-0 z-20 bg-background p-4 text-sm'>
            {profile?.username} / README.md
          </div>

          <RichTextViewer htmlContent={readme?.contents as string} />

          <EditActionBtn
            className='absolute right-4 top-4 z-20'
            variant='ghost'
            onClick={() => setIsEditing(true)}
            title='편집'
            user={user}
          />
        </>
      )}
    </div>
  )
}
