'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useGetMasterProfile } from '@/services/master_profile/useProfile'
import { IProfileInfo } from '@/types/profile'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { EditActionBtn } from '../buttons'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer'
import EditProfileForm from './EditProfileForm'
import { useUpdateMasterProfileStatus } from './hooks/useUpdateMasterProfileStatus'
import ProfileImageChangeButton from './ProfileImageChangeButton'
import ProfileStatusButton from './ProfileStatusButton'

export default function Profile() {
  const [isEditProfile, setIsEditProfile] = useState(false)

  const { data: profile } = useGetMasterProfile()
  return (
    <div className='md:absolute md:-top-7'>
      <ProfileImage
        avatarUrl={profile?.avatar_url}
        profileStatus={profile.status}
      />

      {isEditProfile ? (
        <EditProfileForm
          profile={profile}
          onClose={() => setIsEditProfile(false)}
        />
      ) : (
        <div className='w-full'>
          <ProfileInfo profile={profile} />
          <EditActionBtn
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
            ? avatarUrl.includes('kakaocdn.net')
              ? avatarUrl
              : `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PROFILE_MASTER_URL}/${avatarUrl}`
            : '/images/no-avatar.png'
        }
        alt='avatar'
        fill
        priority={true}
        className='rounded-full object-cover'
        sizes='(max-width: 768px) 5rem, 20rem'
      />

      {/* 이미지 편집 버튼 -모바일 사이즈 */}
      <ProfileImageChangeButton className='absolute -left-2 top-0 h-7 w-7 rounded-full border bg-black text-xs text-white hover:bg-black dark:hover:text-primary md:hidden' />

      {/* 상태 편집 버튼 - 모바일 사이즈 */}
      <ProfileStatusButton
        title='Set Status'
        className='absolute bottom-0 right-0 h-7 w-7 rounded-full border bg-black text-xs hover:bg-black dark:hover:text-primary md:hidden'
        onClick={() => setIsStatusModalOpen(true)}
        profileStatus={profileStatus}
      />

      {/* 이미지 편집 및 상태 편집 - 데스크탑 사이즈*/}
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

function StatusModal({ onClose }: { onClose: () => void }) {
  const { mutate: updateStatus } = useUpdateMasterProfileStatus()

  const isDesktop = useMediaQuery('(min-width: 768px)')
  const emojis = ['😊', '😎', '🎉', '💻', '☕️', '🌟', '🎯', '💪', '✨', '🚀']

  const handleEmojiSelect = (emoji: string) => {
    updateStatus(emoji)
    onClose()
  }

  const EmojiGrid = () => (
    <div className='grid grid-cols-5 gap-4 p-4'>
      {emojis.map((emoji) => (
        <Button
          key={emoji}
          onClick={() => handleEmojiSelect(emoji)}
          className='text-2xl transition-transform hover:scale-125 hover:bg-transparent'
          variant='ghost'
          type='button'
        >
          {emoji}
        </Button>
      ))}
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>상태 설정</DialogTitle>
            <DialogDescription>
              원하시는 이모지를 선택해주세요
            </DialogDescription>
          </DialogHeader>
          <EmojiGrid />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={true} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>상태 설정</DrawerTitle>
          <DrawerDescription>원하시는 이모지를 선택해주세요</DrawerDescription>
        </DrawerHeader>
        <EmojiGrid />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline' className='w-full' type='button'>
              취소
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
