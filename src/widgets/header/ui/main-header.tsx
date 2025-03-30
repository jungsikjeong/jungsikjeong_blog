'use client'

import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { NAVIGATION_LINKS } from '../config/navigation-links'
import useHideHeaderPath from '../modal/hooks/use-hide-header-path'

export function MainHeader() {
  const hideLoginPaths = useHideHeaderPath()

  if (hideLoginPaths) {
    return null
  }

  return (
    <div className='container m-auto flex items-center justify-between p-4 sm:px-0'>
      <Link href='/' className='text-3xl font-bold'>
        Home
      </Link>

      <div className='flex items-center gap-4 text-base font-bold'>
        {NAVIGATION_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </div>

      <LoginToLink />
    </div>
  )
}

function LoginToLink() {
  return (
    <Button
      asChild
      variant='link'
      className='text-base font-bold text-indigo-600'
    >
      <Link href='/signin'>Log in</Link>
    </Button>
  )
}
