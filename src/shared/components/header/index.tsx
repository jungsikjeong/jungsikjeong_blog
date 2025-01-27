import Link from 'next/link'
import AuthStatus from '../auth/AuthStatus'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import UnauthenticatedHeader from './UnauthenticatedHeader'

export function Header() {
  return (
    <header className='h-[65px] bg-neutral-800 px-4 py-2'>
      <UnauthenticatedHeader />
    </header>
  )
}
