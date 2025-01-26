'use client'

import { Menu, User } from 'lucide-react'
import { Button } from '../ui/button'
import { MusicPlayer } from '../musicPlayer'
import LoginButton from '../auth/LoginButton'
import AuthStatus from '../auth/AuthStatus'
MusicPlayer

export function Header() {
  return (
    <header className='mx-auto px-4 py-8'>
      <div className='flex items-center justify-between'>
        <div className='flex-1' /> {/* Spacer */}
        <nav className='flex gap-4 lg:pl-64'>
          {/* <LoginButton /> */}
          <AuthStatus />

          <Button variant='ghost' size='sm'>
            <Menu className='mr-2 h-4 w-4' />
            Categories
          </Button>
          <MusicPlayer />
        </nav>
      </div>
    </header>
  )
}
