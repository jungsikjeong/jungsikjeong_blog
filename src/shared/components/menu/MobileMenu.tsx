'use client'

import { Tables } from '@/types/supabase'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchInput from '../search'
import HamburgerMenuBtn from '../ui/hamburger-menu-btn'
import ActionSearchBar from '../header/search-bar/action-search-bar'

// TODO: 추후 db 테이블에 넣고 사용할지 고민..
const MENU_ITEMS = [
  { title: 'Overview', href: '/' },
  { title: 'Repositories', href: '/repositories' },
  { title: 'Projects', href: '/projects' },
]

interface IMobileMenuProps {
  user?: Tables<'members'>
}

export default function MobileMenu({ user }: IMobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <HamburgerMenuBtn
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        className='text-white dark:text-foreground'
      />

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
                  <Link href='/auth/login'>Sign in</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 top-[65px] z-30 bg-header backdrop-blur-sm transition-opacity duration-500 ease-out'
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
