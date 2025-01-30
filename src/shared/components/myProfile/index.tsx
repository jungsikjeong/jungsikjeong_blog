import { MapPin, PencilLine, Smile } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import ProfileEditBtn from '../buttons/ProfileEditBtn'
// import { useAuth } from '@/providers/AuthProvider'
import { EditActionBtn, StatusBtn } from '../buttons'

export default function MyProfile() {
  // const { user } = useAuth()

  return (
    <div className='md:absolute md:-top-7'>
      <div className='flex items-center gap-4 md:flex-col md:gap-0'>
        <div className='relative flex h-20 w-20 items-center justify-center rounded-full border md:h-80 md:w-80'>
          <Image
            src='/images/no-avatar.png'
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

        <div className='md:w-full'>
          <h3 className='text-2xl'>정중식</h3>
          <span className='text-sm'>JungsikJeong</span>
        </div>
      </div>

      <div className='flex flex-col gap-2 text-sm md:gap-4'>
        <div className='pt-4 text-base md:border-b md:pb-2'>
          <p>프론트엔드 비중이 높은 풀스택 개발자</p>
        </div>

        <div className='pb-2 md:border-b'>
          <p className='flex items-center gap-1'>
            <MapPin /> Bucheon, Korea
          </p>
        </div>

        <ProfileEditBtn />
      </div>
    </div>
  )
}
