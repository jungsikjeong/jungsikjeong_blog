'use client'

import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Tables } from '@/types/supabase'
import { ChevronDown } from 'lucide-react'
import LogoutButton from './LogoutButton'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function UserMenu({ user }: { user: Tables<'members'> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='hover:bg-transparent'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user.avatar_url || ''} />
            <AvatarFallback>{user.nickname[0]}</AvatarFallback>
          </Avatar>

          <ChevronDown className='h-4 w-4 text-white' />
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
