'use client'

import { Menu, User } from 'lucide-react'
import { Button } from '../ui/button'
import { MusicPlayer } from './MusicPlayer'

export function Header() {
  return (
    <header className='mx-auto py-8'>
      <div className='mb-8 flex items-center justify-between'>
        <div className='flex-1' /> {/* Spacer */}
        <nav className='<div className="lg:pl-64"> flex gap-4'>
          <Button variant='ghost' size='sm'>
            <User className='mr-2 h-4 w-4' />
            Login
          </Button>
          <Button variant='ghost' size='sm'>
            <Menu className='mr-2 h-4 w-4' />
            Categories
          </Button>
          <MusicPlayer />
        </nav>
      </div>

      <h1
        className='text-center text-4xl font-bold md:text-6xl'
        style={{ fontFamily: 'comic sans ms, cursive' }}
      >
        Five Years of Firefox
      </h1>
    </header>
  )
}
