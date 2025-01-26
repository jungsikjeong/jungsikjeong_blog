'use client'

import { Input } from '@/shared/components/ui/input'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function BlogSidebar() {
  return (
    <div className='fixed left-0 top-0 hidden h-screen w-64 border-r bg-background px-4 py-6 lg:block'>
      <ScrollArea className='relative h-full'>
        <div className='space-y-6'>
          {/* Profile Section */}
          <div className='text-center'>
            <Avatar className='mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h3 className='text-lg font-semibold'>실생활에 유용한 IT</h3>
            <p className='text-sm text-muted-foreground'>뉴비블로그</p>
          </div>

          {/* Visitor Stats */}
          <div className='grid grid-cols-2 gap-4 rounded-lg bg-muted p-3'>
            <div className='text-center'>
              <p className='text-sm text-muted-foreground'>전체 방문자</p>
              <p className='text-lg font-semibold'>25,598</p>
            </div>
            <div className='text-center'>
              <p className='text-sm text-muted-foreground'>오늘 방문자</p>
              <p className='text-lg font-semibold'>15</p>
            </div>
          </div>

          {/* Search */}
          <div>
            <Input type='search' placeholder='Search...' className='w-full' />
          </div>

          {/* Recent Comments */}
          <div>
            <h4 className='mb-4 font-semibold'>최근 댓글</h4>
            <div className='space-y-2'>
              {[
                '안녕하세요 혹시 vite로 vue3 작...',
                'css안먹히요 ㅠㅠ',
                '감사합니다',
                '노드2',
                '노드2',
              ].map((comment, i) => (
                <div key={i} className='text-sm'>
                  <p className='line-clamp-1 text-muted-foreground'>
                    {comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className='absolute bottom-0 text-center text-sm text-muted-foreground'>
            @2025 Created By 정중식
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
