'use client'

import { ThemeToggle } from '../../theme/theme-mode-toggle'
import LoginButton from '../../auth/LoginButton'
import SearchInput from '../../search'
import Logo from '../../logo'

export default function UnautHeader() {
  return (
    <nav className='flex h-full items-center'>
      <div className='flex h-full w-full items-center'>
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
