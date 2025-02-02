'use client'

import { useGetProfile } from '@/services/profile/useProfile'
import { IProfileInfo } from '@/types/profile'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { EditActionBtn, StatusBtn } from '../buttons'
import ProfileEditBtn from '../buttons/ProfileEditBtn'
import { Label } from '../ui/label'
import EditProfileForm from './EditProfileForm'

export default function Profile() {
  const [isEditProfile, setIsEditProfile] = useState(false)

  const { data: profile } = useGetProfile()

  return (
    <div className='md:absolute md:-top-7'>
      <ProfileImage avatarUrl={profile?.avatar_url} />

      {isEditProfile ? (
        <EditProfileForm
          profile={profile}
          onClose={() => setIsEditProfile(false)}
        />
      ) : (
        <div className='w-full'>
          <ProfileInfo profile={profile} />
          <ProfileEditBtn
            onAction={() => setIsEditProfile(true)}
            className='my-4 rounded-md'
          />
        </div>
      )}
    </div>
  )
}

function ProfileImage({ avatarUrl }: { avatarUrl: string | null }) {
  return (
    <div className='relative flex h-20 w-20 items-center justify-center rounded-full border md:h-80 md:w-80'>
      <Image
        src={avatarUrl ?? '/images/no-avatar.png'}
        alt='avatar'
        fill
        priority={true}
        className='rounded-full object-cover'
        sizes='(max-width: 768px) 5rem, 20rem'
      />
      <Label htmlFor='file' />
      <input type='file' id='file' className='hidden' />

      {/* 이미지 편집 버튼 -모바일용 */}
      <EditActionBtn className='absolute left-0 top-0 h-7 w-7 rounded-full border bg-black text-xs text-white hover:bg-black dark:hover:text-primary md:hidden' />

      {/* 상태 편집 버튼 - 모바일용 */}
      <StatusBtn className='absolute bottom-0 right-0 h-7 w-7 rounded-full border bg-black text-xs hover:bg-black dark:hover:text-primary md:hidden' />

      {/* 이미지 편집 및 상태 편집 - 데스크탑용*/}
      <div className='absolute -bottom-2 left-0 z-10 hidden w-full items-center justify-between md:bottom-12 md:flex'>
        <EditActionBtn className='rounded-full border bg-black text-xs text-white hover:bg-black dark:hover:text-primary' />

        <StatusBtn className='rounded-full border bg-black text-xs hover:bg-black dark:hover:text-primary' />
      </div>
    </div>
  )
}

function ProfileInfo({ profile }: IProfileInfo) {
  return (
    <>
      <div className='flex items-center gap-4 md:flex-col md:gap-0'>
        <div className='md:w-full'>
          <h3 className='text-2xl'>{profile.username}</h3>
          <span className='text-sm'>{profile.nickname}</span>
        </div>
      </div>

      <div className='flex flex-col gap-2 text-sm md:gap-3'>
        <div className='pt-4 text-base md:border-b md:pb-2'>
          <p>{profile.bio}</p>
        </div>

        <div className='my-2 flex flex-col gap-2'>
          <div className=''>
            <a
              href={`mailto:${profile.display_email}`}
              className='transition-colors duration-200 hover:text-blue-500'
            >
              {profile.display_email}
            </a>
          </div>

          {profile.social_accounts &&
            profile.social_accounts
              .filter((account) => account.trim() !== '')
              .map((account, index) => (
                <div key={account + index}>
                  <a
                    href={account}
                    target='_blank'
                    className='transition-colors duration-200 hover:text-blue-500'
                  >
                    {account}
                  </a>
                </div>
              ))}
        </div>

        <div className='pb-2 md:border-b'>
          <p className='flex items-center gap-1'>
            <MapPin /> {profile.location}
          </p>
        </div>
      </div>
    </>
  )
}
