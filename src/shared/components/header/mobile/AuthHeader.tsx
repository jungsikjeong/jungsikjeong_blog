'use client'

import { Tables } from '@/types/supabase'
import Link from 'next/link'
import UserMenu from '../../auth/UserMenu'
import { ChevronRight } from 'lucide-react'
import HamburgerMenu from '../../ui/hamburger-menu'
import { useState } from 'react'
import SearchInput from '../../search'
import { ModeToggle } from '../../theme/theme-mode-toggle'

// TODO: 추후 db 테이블에 넣고 사용할지 고민..
const MENU_ITEMS = [
  { title: 'Overview', href: '/' },
  { title: 'Repositories', href: '/repositories' },
  { title: 'Projects', href: '/projects' },
]

export default function AuthHeader({ user }: { user: Tables<'members'> }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className='fixed left-0 right-0 top-0 z-50 flex h-[65px] items-center gap-2 bg-background p-4'>
        <HamburgerMenu
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          className='text-foreground'
        />

        <ModeToggle />

        <div className='ml-auto'>
          <UserMenu user={user} />
        </div>
      </nav>

      {/* Menu-list */}
      <div
        className={`fixed left-0 right-0 top-[65px] z-50 h-full transition-all duration-200 ease-out ${
          !isMenuOpen
            ? 'pointer-events-none -translate-x-4 opacity-0'
            : 'translate-x-0 opacity-100'
        }`}
      >
        <div className='h-full w-full transform rounded-tl-2xl rounded-tr-2xl bg-background'>
          <div className='flex h-full flex-col justify-between px-7 py-5'>
            <div className='flex flex-col'>
              {MENU_ITEMS.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className='flex items-center justify-between border-b border-border py-4 text-lg text-foreground hover:text-muted-foreground'
                >
                  {item.title}
                  <ChevronRight className='h-5 w-5' />
                </Link>
              ))}
            </div>

            <div className='mb-20'>
              {/* Search Bar */}
              <div className='relative flex items-center'>
                <SearchInput
                  placeholder='Search or jump to...'
                  className='w-full rounded-lg border border-input bg-background px-4 py-2 pr-12 text-foreground focus:border-ring focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                />

                <div className='absolute right-3 rounded border border-input px-2 py-1 text-xs text-muted-foreground'>
                  /
                </div>
              </div>

              {/* Sign in Button */}
              {!user && (
                <button className='mt-4 w-full rounded-lg bg-primary py-2 text-primary-foreground transition-colors hover:bg-primary/90'>
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 top-[65px] z-30 bg-background/80 backdrop-blur-sm transition-opacity duration-500 ease-out'
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
