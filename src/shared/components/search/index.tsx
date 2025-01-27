'use client'

import { Input } from '../ui/input'

export default function Search() {
  return (
    <Input
      type='text'
      placeholder='Search or jump to...'
      className='h-8 w-60 text-sm'
    />
  )
}
