'use client'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function LoginButton() {
  return (
    <Button size='sm' className='text-sm sm:px-4 sm:text-base'>
      <Link href='/auth/login'>로그인</Link>
    </Button>
  )
}
