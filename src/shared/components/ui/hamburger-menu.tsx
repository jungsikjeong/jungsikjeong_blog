import { cn } from '@/lib/utils'
import React, { useState } from 'react'

interface IHamburgerMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  className?: string
}

const HamburgerMenu = ({
  isOpen,
  setIsOpen,
  className,
}: IHamburgerMenuProps) => {
  return (
    <button
      className={cn(
        'relative h-8 w-8 focus:outline-none md:h-10 md:w-10',
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='absolute left-1 top-1/2 block w-6 -translate-y-1/2 transform md:w-8'>
        <span
          className={`absolute block h-0.5 w-6 transform bg-current transition duration-500 ease-in-out md:w-8 ${
            isOpen ? 'rotate-45' : '-translate-y-1.5 md:-translate-y-2'
          }`}
        ></span>
        <span
          className={`absolute block h-0.5 w-6 transform bg-current transition duration-500 ease-in-out md:w-8 ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`absolute block h-0.5 w-6 transform bg-current transition duration-500 ease-in-out md:w-8 ${
            isOpen ? '-rotate-45' : 'translate-y-1.5 md:translate-y-2'
          }`}
        ></span>
      </div>
    </button>
  )
}

export default HamburgerMenu
