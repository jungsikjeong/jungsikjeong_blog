'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
  return (
    <div className="container m-auto flex items-center justify-between p-4 sm:px-0">
      <Link href="/" className="text-3xl font-bold">
        Home
      </Link>

      <LoginToLink />
    </div>
  )
}

function LoginToLink() {
  return (
    <Button
      asChild
      variant="link"
      className="text-base font-bold text-indigo-600"
    >
      <Link href="/auth/signin">Log in</Link>
    </Button>
  )
}
