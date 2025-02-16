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
import RepositoryItem from '../RepositoryItem'

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
              href={'/post/create'}
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
          <RepositoryItem key={repo.id} repo={repo} />
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
