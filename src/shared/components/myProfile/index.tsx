import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Image from 'next/image'

export default function MyProfile() {
  return (
    <div>
      <div className='relative flex items-center justify-center rounded-full md:h-80 md:w-80'>
        <Image
          src='/images/no-avatar.png'
          alt='avatar'
          fill
          className='rounded-full'
        />
        <Label htmlFor='file' />
      </div>

      <input type='file' id='file' className='hidden' />
    </div>
  )
}
