'use client'

import { useGetProfileByMemberId } from '@/services/profile/useProfile'
import { IProfile, IProfileInfo } from '@/types/profile'
import { Tables } from '@/types/supabase'
import { getStorageImageUrl } from '@/utils/supabase/get-image-url'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { EditActionBtn } from '../buttons'
import EditProfileForm from './EditProfileForm'
import ProfileImageChangeButton from './ProfileImageChangeButton'
import ProfileStatusButton from './ProfileStatusButton'
import StatusModal from './StatusModal'

export default function Profile({
  user,
  isGuestUser,
}: {
  user: Tables<'members'> | null
  isGuestUser: boolean
}) {
  const [isEditProfile, setIsEditProfile] = useState(false)

  const { data: profile } = useGetProfileByMemberId(
    isGuestUser && user
      ? user.id
      : (process.env.NEXT_PUBLIC_ADMIN_ID as string),
  )

  return (
    <div className='md:absolute md:-top-7'>
      <ProfileImage
        avatarUrl={profile.avatar_url}
        profileStatus={profile.status}
      />

      {isEditProfile ? (
        <EditProfileForm
          profile={profile as IProfile}
          onClose={() => setIsEditProfile(false)}
        />
      ) : (
        <div className='w-full'>
          <ProfileInfo profile={profile as IProfile} />
          <EditActionBtn
            user={user}
            onClick={() => setIsEditProfile(true)}
            className='my-4 w-full rounded-md border'
            title='Edit profile'
            tooltip='Edit profile'
          />
        </div>
      )}
    </div>
  )
}

function ProfileImage({
  avatarUrl,
  profileStatus,
}: {
  avatarUrl: string | null
  profileStatus: string | null
}) {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)

  return (
    <div className='relative flex h-20 w-20 items-center justify-center rounded-full border md:h-80 md:w-80'>
      <Image
        src={
          avatarUrl
            ? getStorageImageUrl(avatarUrl)
            : '/profile_images/meme_patrick_i_have_3_dollars.png'
        }
        alt='avatar_img'
        fill
        priority={true}
        className='rounded-full object-cover'
        sizes='(max-width: 768px) 5rem, 20rem'
      />

      {/* 이미지 편집 버튼 -모바일  */}
      <ProfileImageChangeButton className='absolute -left-2 top-0 h-7 w-7 rounded-full border bg-black text-xs text-white hover:bg-black dark:hover:text-primary md:hidden' />

      {/* 상태 편집 버튼 - 모바일  */}
      <ProfileStatusButton
        title='Set Status'
        className='absolute bottom-0 right-0 h-7 w-7 rounded-full border bg-black text-xs hover:bg-black dark:hover:text-primary md:hidden'
        onClick={() => setIsStatusModalOpen(true)}
        profileStatus={profileStatus}
      />

      {/* 이미지 편집 및 상태 편집 - 데스크탑 */}
      <div className='absolute -bottom-2 left-0 z-10 hidden w-full items-center justify-between md:bottom-12 md:flex'>
        <ProfileImageChangeButton className='h-9 w-9 rounded-full border bg-black text-xs text-white hover:bg-black hover:text-accent-foreground hover:text-white dark:hover:text-primary' />

        <ProfileStatusButton
          title='Set Status'
          className='rounded-full border bg-black text-xs hover:bg-black dark:hover:text-primary'
          onClick={() => setIsStatusModalOpen(true)}
          profileStatus={profileStatus}
        />
      </div>

      {isStatusModalOpen && (
        <StatusModal onClose={() => setIsStatusModalOpen(false)} />
      )}
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
        {profile.bio && (
          <div className='pt-4 text-base md:border-b md:pb-2'>
            <p>{profile.bio}</p>
          </div>
        )}

        <div className='my-2 flex flex-col gap-2'>
          {profile.display_email && (
            <div>
              <a
                href={`mailto:${profile.display_email}`}
                className='transition-colors duration-200 hover:text-blue-500'
              >
                {profile.display_email}
              </a>
            </div>
          )}

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

        {profile.location && (
          <div className='pb-2 md:border-b'>
            <p className='flex items-center gap-1'>
              <MapPin /> {profile.location}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
