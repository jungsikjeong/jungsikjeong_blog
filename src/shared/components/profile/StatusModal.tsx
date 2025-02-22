'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useUpdateMasterProfileStatus } from './hooks/useUpdateMasterProfileStatus'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'

export default function StatusModal({ onClose }: { onClose: () => void }) {
  const { mutate: updateStatus } = useUpdateMasterProfileStatus()

  const isDesktop = useMediaQuery('(min-width: 768px)')
  const emojis = ['😊', '😎', '🎉', '💻', '☕️', '🌟', '🎯', '💪', '✨', '🚀']

  const handleEmojiSelect = (emoji: string) => {
    updateStatus(emoji)
    onClose()
  }

  const EmojiGrid = () => (
    <div className='grid grid-cols-5 gap-4 p-4'>
      {emojis.map((emoji) => (
        <Button
          key={emoji}
          onClick={() => handleEmojiSelect(emoji)}
          className='text-2xl transition-transform hover:scale-125 hover:bg-transparent'
          variant='ghost'
          type='button'
        >
          {emoji}
        </Button>
      ))}
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>상태 설정</DialogTitle>
            <DialogDescription>
              원하시는 이모지를 선택해주세요
            </DialogDescription>
          </DialogHeader>
          <EmojiGrid />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={true} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>상태 설정</DrawerTitle>
          <DrawerDescription>원하시는 이모지를 선택해주세요</DrawerDescription>
        </DrawerHeader>
        <EmojiGrid />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline' className='w-full' type='button'>
              취소
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
