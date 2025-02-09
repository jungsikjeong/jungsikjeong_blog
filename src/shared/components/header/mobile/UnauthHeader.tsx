'use client'

import { useState } from 'react'
import LoginButton from '../../auth/LoginButton'
import SearchInput from '../../search'
import { ThemeToggle } from '../../theme/theme-mode-toggle'
import MobileMenu from '../../menu/MobileMenu'
import Logo from '../../logo'

export default function UnautHeader() {
  return (
    <nav className='flex h-full w-full items-center justify-between'>
      <div className='flex h-full w-full items-center'>
        <MobileMenu />

        <div className='flex-1'>
          <SearchInput
            placeholder='Search or jump to...'
            className='hidden h-8 w-60 text-sm md:block'
          />
        </div>

        <Logo />

        <div className='flex h-full flex-1 items-center justify-end gap-2'>
          <ThemeToggle />

          <LoginButton variant={'outline'} />
        </div>
      </div>
    </nav>
  )
}
