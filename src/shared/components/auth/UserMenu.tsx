'use client'

import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Tables } from '@/types/supabase'
import { UserIcon } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default function UserMenu({ user }: { user: Tables<'members'> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='hover:bg-transparent'>
          <UserIcon className='h-4 w-4 sm:hidden' />

          <span className='hidden sm:flex'>{user.nickname}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-10 p-0 sm:w-full'>
        <DropdownMenuItem>
          <LogoutButton size={'sm'} variant={'ghost'} className='w-full' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
