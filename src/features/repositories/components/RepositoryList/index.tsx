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
import { ListFilter } from 'lucide-react'
import { useState } from 'react'
import { categories, repositories } from './data'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const ITEMS_PER_PAGE = 3

export default function RepositoryList() {
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
      <div className='relative flex items-center'>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
            skipSnaps: false,
            inViewThreshold: 0.7,
          }}
          className='w-full pr-12'
        >
          <CarouselContent>
            <CarouselItem className='basis-auto pl-2 md:pl-4'>
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => handleCategorySelect(null)}
                className='whitespace-nowrap text-sm'
              >
                All
              </Button>
            </CarouselItem>
            {categories.map((category) => (
              <CarouselItem key={category} className='basis-auto pl-2 md:pl-4'>
                <Button
                  variant={
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  onClick={() => handleCategorySelect(category)}
                  className='whitespace-nowrap text-sm'
                >
                  {category}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Sheet>
          <SheetTrigger asChild className='absolute right-0 !m-0'>
            <Button
              variant='outline'
              size='icon'
              className='shrink-0'
              title='all tags'
            >
              <ListFilter className='h-4 w-4' />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>All Categories</SheetTitle>
              <SheetDescription>
                Select a category to filter repositories
              </SheetDescription>
            </SheetHeader>

            <div className='mt-4 grid grid-cols-2 gap-2'>
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => handleCategorySelect(null)}
                className='whitespace-nowrap text-sm'
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  onClick={() => handleCategorySelect(category)}
                  className='whitespace-nowrap text-sm'
                >
                  {category}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
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
