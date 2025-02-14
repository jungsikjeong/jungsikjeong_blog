'use client'

import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/components/ui/carousel'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'
import { Badge, BookMarked, ListFilter } from 'lucide-react'
import { useState } from 'react'
import { categories, repositories } from './data'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/shared/components/ui/select'
import ActionSearchBar from '@/shared/components/header/search-bar/action-search-bar'
import SearchInput from '@/shared/components/search'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { badgeVariants } from '@/shared/components/ui/badge'
import { buttonVariants } from '@/shared/components/ui/button'
import { Tables } from '@/types/supabase'

const ITEMS_PER_PAGE = 3

export default function RepositoryList({
  user,
}: {
  user: Tables<'members'> | null
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredRepositories = repositories.filter(
    (repo) => !selectedCategory || repo.category === selectedCategory,
  )

  const totalPages = Math.ceil(filteredRepositories.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedRepositories = filteredRepositories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  )

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1) // 카테고리 변경 시 첫 페이지로 재설정
  }

  return (
    <div className='sm mx-auto w-full max-w-4xl space-y-6'>
      <div className='relative flex flex-wrap items-stretch gap-2 md:flex-nowrap'>
        <SearchInput
          placeholder='Find a repository...'
          className='h-full w-full rounded-lg'
        />

        <Select
          value={selectedCategory ?? 'all'}
          onValueChange={(value) =>
            handleCategorySelect(value === 'all' ? null : value)
          }
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='카테고리 선택' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='all'>전체</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {user && user.is_admin && (
          <div>
            <Link
              href={'/'}
              className={cn(
                badgeVariants({ variant: 'default' }),
                'flex h-full items-center gap-2',
              )}
            >
              <BookMarked className='h-4 w-4' />
              New
            </Link>
          </div>
        )}
      </div>

      <div className='space-y-4'>
        {displayedRepositories.map((repo) => (
          <Card
            key={repo.id}
            className='w-full transition-colors hover:bg-accent'
          >
            <CardContent className='p-4'>
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-lg font-semibold text-primary'>
                    {repo.title}
                  </h3>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {repo.description}
                  </p>
                </div>
              </div>

              <div className='mt-4 flex items-center gap-4'>
                <span className='rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground'>
                  {repo.category}
                </span>
                <span className='text-sm text-muted-foreground'>
                  {format(new Date(repo.createdAt), 'PPP', { locale: ko })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-4 pt-4'>
          <Button
            variant='ghost'
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className='border border-transparent text-blue-500 hover:border-border hover:bg-transparent hover:text-blue-700 disabled:text-gray-400'
          >
            Previous
          </Button>
          <Button
            variant='ghost'
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className='border border-transparent text-blue-500 hover:border-border hover:bg-transparent hover:text-blue-700 disabled:text-gray-400'
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
