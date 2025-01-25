'use client'

import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { Slider } from '@/shared/components/ui/slider'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Info,
  Heart,
  ListMusic,
} from 'lucide-react'
import { useState } from 'react'

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(78) // 19:44 out of 25:00 = ~78%

  return (
    <Drawer direction='bottom'>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='sm'>
          <ListMusic className='mr-2 h-4 w-4' />
          Music
        </Button>
      </DrawerTrigger>
      <DrawerContent className='h-[400px]'>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle className='text-center text-sm font-normal text-muted-foreground'>
              Episode Name
            </DrawerTitle>
          </DrawerHeader>
          <div className='px-4'>
            <div className='mb-4 aspect-square rounded-md bg-muted' />

            {/* Progress Bar */}
            <div className='space-y-2'>
              <Slider
                value={[progress]}
                max={100}
                step={1}
                className='cursor-pointer'
                onValueChange={(value: number[]) => setProgress(value[0])}
              />
              <div className='flex justify-between text-xs text-muted-foreground'>
                <span>19:44</span>
                <span>25:00</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className='mt-8 flex items-center justify-center gap-4'>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <SkipBack className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='h-12 w-12'
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className='h-6 w-6' />
                ) : (
                  <Play className='h-6 w-6' />
                )}
              </Button>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <SkipForward className='h-4 w-4' />
              </Button>
            </div>

            {/* Bottom Controls */}
            <div className='mt-8 flex items-center justify-center gap-6'>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <Info className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <Heart className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <Repeat className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <Shuffle className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
