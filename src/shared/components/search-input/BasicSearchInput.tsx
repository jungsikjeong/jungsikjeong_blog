'use client'

import { cn } from '@/lib/utils'
import { Input } from '../ui/input'

interface SearchInputProps {
  className?: string
  placeholder: string
}

export default function BasicSearchInput({
  className,
  placeholder,
}: SearchInputProps) {
  return (
    <>
      <Input type='text' placeholder={placeholder} className={cn(className)} />
    </>
  )
}
