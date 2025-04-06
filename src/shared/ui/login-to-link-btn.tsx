'use client'

import { Button } from '@/shared/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

function AniLoginToLinkBtn() {
  return (
    <div>
      <AnimatePresence mode='wait'>
        <motion.div
          key='login-button'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 1 }}
        >
          <Button
            variant='link'
            className='text-base font-bold text-indigo-600'
          >
            <Link href='/auth/signin'>Log in</Link>
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function LoginToLinkBtn() {
  return (
    <Button
      asChild
      variant='link'
      className='text-base font-bold text-indigo-600'
    >
      Log in
    </Button>
  )
}

export { AniLoginToLinkBtn, LoginToLinkBtn }
