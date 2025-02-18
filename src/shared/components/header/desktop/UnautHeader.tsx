'use client'

import { ThemeToggle } from '../../theme/theme-mode-toggle'
import LoginButton from '../../auth/LoginButton'
import Logo from '../../logo'
import ActionSearchBar from '../../search-input/AnimatedSearchInput'

export default function UnautHeader() {
  return (
    <nav className='flex h-full items-center'>
      <div className='flex h-full w-full items-center'>
        <div className='flex-1'>
          <ActionSearchBar
            placeholder='Search or jump to...'
            className='absolute left-5 top-0 w-80'
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
