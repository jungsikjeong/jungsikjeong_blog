'use client'

import LoginButton from '../auth/LoginButton'
import Search from '../search'

export default function UnauthenticatedHeader() {
  return (
    <nav className='flex h-full items-center'>
      <div className='flex h-full w-full items-center'>
        <div className='flex-1'>
          <Search />
        </div>

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

        <div className='flex flex-1 justify-end'>
          <LoginButton
            variant={'outline'}
            className='bg-neutral-800 text-white hover:bg-neutral-800 hover:text-white'
          />
        </div>
      </div>
    </nav>
  )
}
