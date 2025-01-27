'use client'

import Link from 'next/link'
import AuthStatus from '../auth/AuthStatus'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'

export default function AuthenticatedHeader() {
  return (
    <nav className='flex items-center gap-2'>
      <Link href='/'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>

      <Input
        type='text'
        placeholder='Search or jump to...'
        className='h-8 w-60 text-sm'
      />

      <div>
        <AuthStatus />
      </div>
    </nav>
  )
}
