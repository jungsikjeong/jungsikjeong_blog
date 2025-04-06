'use client'

import { KakaoLoginBtn } from '@/features/auth'
import { Button } from '@/shared/ui/button'
import { animate, easeInOut, motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const MotionImage = motion(Image)

const MotionButton = motion(Button)

export function LoginForm() {
  const y = useMotionValue(-50)

  useEffect(() => {
    const controls = animate(y, 0, {
      duration: 0.5,
      ease: easeInOut,
    })
    return controls.stop
  }, [])

  return (
    <div className='flex w-full justify-center'>
      <div className='relative h-64 w-80 sm:w-96'>
        <motion.div
          className='absolute top-11 left-1/3 z-10 -translate-x-1/2'
          initial={{
            scale: 1,
            opacity: 0,
          }}
          animate={{
            scale: [1, 1.05],
            opacity: 1,
          }}
          transition={{
            opacity: { duration: 0.3, delay: 0.8 },
            scale: {
              type: 'spring',
              stiffness: 200,
              damping: 4.5,
              delay: 1.6,
            },
          }}
          whileHover={{
            scale: 1.1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 10,
            },
          }}
        >
          <KakaoLoginBtn />
        </motion.div>

        <div className='relative h-72 w-full'>
          <MotionImage
            src='/images/login_page_image.jpg'
            alt='image'
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 1 }}
          />

          <motion.div
            className='absolute bottom-10 left-1/2 -rotate-45 text-3xl font-semibold'
            initial={{ x: 100, y: -10, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              opacity: { duration: 2, ease: 'linear' },
            }}
          >
            Do It!
          </motion.div>

          <MotionButton
            variant={'ghost'}
            className="absolute -bottom-8 p-0 font-serif font-semibold transition-all duration-300 before:mr-0 before:content-['/'] after:ml-0 after:content-['\\'] hover:scale-105 hover:bg-transparent"
            asChild
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.8 }}
          >
            <Link href='/'>Back to Home</Link>
          </MotionButton>
        </div>
      </div>
    </div>
  )
}
