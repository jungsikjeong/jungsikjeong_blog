import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import EditBtn from '../buttons/EditBtn'

export default function MyProfile() {
  return (
    <div className='md:absolute md:-top-7'>
      <div className='flex items-center gap-4 md:flex-col md:gap-0'>
        <div className='relative flex h-20 w-20 items-center justify-center rounded-full md:h-80 md:w-80'>
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
        </div>

        <div className={'pb-2 md:w-full'}>
          <h3 className='text-2xl'>정중식</h3>
          <span className='text-sm'>JungsikJeong</span>
        </div>

        <EditBtn />
      </div>

      <div className='flex flex-col gap-4 text-sm'>
        <div className='pb-2 pt-4 text-base md:border-b'>
          <p>프론트엔드 비중이 높은 풀스택 개발자</p>
        </div>

        <div className='pb-2 md:border-b'>
          <p className='flex items-center gap-1'>
            <MapPin /> Bucheon, Korea
          </p>
        </div>
      </div>
    </div>
  )
}
