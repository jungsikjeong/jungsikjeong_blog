'use client'

import { KakaoLoginBtn } from '@/features/auth'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function LoginForm() {
  return (
    <div className='flex w-full justify-center'>
      <div className='relative h-64 w-80 sm:w-96'>
        <div className='absolute top-11 left-1/3 z-10 -translate-x-1/2 transition-all duration-300 hover:scale-105'>
          <KakaoLoginBtn />
        </div>

        <div className='group relative h-72 w-full'>
          <Image
            src='/images/login_page_image.jpg'
            alt='image'
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute bottom-10 left-1/2 -rotate-45 text-3xl font-semibold'>
            Do It!
          </div>

          <Button
            variant={'ghost'}
            className="absolute -bottom-8 p-0 font-serif font-semibold transition-all duration-300 before:mr-0 before:content-['/'] after:ml-0 after:content-['\\'] hover:scale-105 hover:bg-transparent"
            asChild
          >
            <Link href='/'>Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
