'use client'

import { Tables } from '@/types/supabase'
import Link from 'next/link'
import UserMenu from '../../auth/UserMenu'
import { Input } from '../../ui/input'

export default function AuthHeader({ user }: { user: Tables<'members'> }) {
  return (
    <nav className='flex items-center gap-2'>
      <Link href='/'>
        <div className='group relative h-12 w-12 overflow-hidden rounded-full'>
          {/* 기본 이미지 */}
          <div
            className='absolute inset-0 h-full w-full transition-opacity duration-200 ease-in-out group-hover:opacity-0'
            style={{
              background: "url('/images/logo.png') no-repeat 2px 2px",
              backgroundSize: '90px',
            }}
          />
          {/* 호버 시 나타날 이미지 */}
          <div
            className='absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100'
            style={{
              background: "url('/images/logo.png') no-repeat -42px 0px",
              backgroundSize: '90px',
            }}
          />
        </div>
      </Link>

      <Input
        type='text'
        placeholder='Search or jump to...'
        className='h-8 w-60 text-sm'
      />

      <div className='ml-auto'>
        <UserMenu user={user} />
      </div>
    </nav>
  )
}
