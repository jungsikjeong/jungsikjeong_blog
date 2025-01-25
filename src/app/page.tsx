import { MusicPlayer } from '@/shared/components/header/MusicPlayer'
import { BlogSidebar } from '@/shared/components/sidebar/BlogSidebar'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel'
import { Input } from '@/shared/components/ui/input'
import { TapeEffect } from '@/shared/components/ui/tape-effect'
import { Menu, PlayCircle, User } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Sidebar */}
      <BlogSidebar />

      <div className='lg:pl-64'>
        {' '}
        {/* Add padding to offset sidebar */}
        {/* Header */}
        <header className='container mx-auto py-8'>
          <div className='mb-8 flex items-center justify-between'>
            <div className='flex-1' /> {/* Spacer */}
            <nav className='flex gap-4'>
              <Button variant='ghost' size='sm'>
                <User className='mr-2 h-4 w-4' />
                Login
              </Button>
              <Button variant='ghost' size='sm'>
                <Menu className='mr-2 h-4 w-4' />
                Categories
              </Button>
              <MusicPlayer />
            </nav>
          </div>
          <h1
            className='text-center text-4xl font-bold md:text-6xl'
            style={{ fontFamily: 'comic sans ms, cursive' }}
          >
            Five Years of Firefox
          </h1>
        </header>
        {/* Main Content */}
        <main className='container mx-auto space-y-12 px-4 pb-16'>
          {/* Video Section */}
          <section className='grid gap-8 md:grid-cols-2'>
            <Card className='relative flex aspect-video rotate-1 items-center justify-center bg-muted shadow-lg'>
              <TapeEffect />
              <PlayCircle className='h-16 w-16 text-primary' />
            </Card>
            <Card className='flex aspect-video -rotate-1 items-center justify-center bg-muted shadow-lg'>
              <TapeEffect />
              <p className='text-2xl font-semibold'>TBD Content</p>
            </Card>
          </section>

          {/* Celebrate and Photos Section */}
          <section className='grid gap-8 lg:grid-cols-3'>
            {/* Celebrate Section */}
            <div className='space-y-6 lg:col-span-2'>
              <h2
                className='text-center text-3xl font-bold'
                style={{ fontFamily: 'comic sans ms, cursive' }}
              >
                Celebrate!
              </h2>
              <div className='grid gap-6 md:grid-cols-3'>
                {[1, 2, 3].map((num) => (
                  <Card
                    key={num}
                    className='relative rotate-1 shadow-lg transition-transform hover:-translate-y-1'
                  >
                    <TapeEffect />
                    <CardContent className='space-y-4 p-6 text-center'>
                      <div className='text-2xl font-bold'>Step {num}</div>
                      <p className='text-muted-foreground'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Photos Section */}
            <div className='space-y-6'>
              <h2
                className='text-3xl font-bold'
                style={{ fontFamily: 'comic sans ms, cursive' }}
              >
                Photos
              </h2>
              <div className='grid grid-cols-2 gap-4'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card
                    key={i}
                    className={`group relative aspect-square overflow-hidden shadow-lg ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                  >
                    <TapeEffect />
                    <Image
                      src='/placeholder.svg'
                      alt={`Photo ${i + 1}`}
                      fill
                      className='object-cover transition-transform group-hover:scale-105'
                    />
                  </Card>
                ))}
              </div>
              <Button className='w-full'>Add Photos</Button>
            </div>
          </section>

          {/* Promo Boxes */}
          <section className='grid gap-6 md:grid-cols-2'>
            {[1, 2].map((num) => (
              <Card key={num} className='relative rotate-1 shadow-lg'>
                <TapeEffect />
                <CardContent className='p-6'>
                  <h3 className='mb-2 text-xl font-semibold'>
                    Promo Box {num}
                  </h3>
                  <p className='text-muted-foreground'>
                    Exciting promotional content goes here.
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Newsletter */}
          <section className='mx-auto max-w-xl space-y-4 text-center'>
            <h2
              className='text-2xl font-bold'
              style={{ fontFamily: 'comic sans ms, cursive' }}
            >
              Stay in touch!
            </h2>
            <Card className='relative -rotate-1 p-4 shadow-lg'>
              <TapeEffect />
              <div className='flex gap-2'>
                <Input type='email' placeholder='Enter your email' />
                <Button>Subscribe</Button>
              </div>
            </Card>
          </section>

          {/* Bottom Carousel */}
          <section className='space-y-4'>
            <h2
              className='text-center text-3xl font-bold'
              style={{ fontFamily: 'comic sans ms, cursive' }}
            >
              Gallery
            </h2>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className='w-full'
            >
              <CarouselContent className='-ml-2 md:-ml-4'>
                {Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className='basis-1/2 pl-2 md:basis-1/3 md:pl-4 lg:basis-1/5'
                  >
                    <Card
                      className={`relative aspect-square overflow-hidden shadow-lg ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
                    >
                      <TapeEffect />
                      <Image
                        src='/placeholder.svg'
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className='object-cover'
                      />
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </main>
      </div>
    </div>
  )
}
