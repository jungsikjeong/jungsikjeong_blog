'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Settings } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { Label } from '@/shared/components/ui/label'

const packages = [
  {
    value: 'repository',
    label: 'Repository',
  },
  {
    value: 'project',
    label: 'Project',
  },
]

export function PackageCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between border-none sm:w-52'
        >
          {value
            ? packages.find((pkg) => pkg.value === value)?.label
            : 'package'}
          <Settings className='opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <Label className='ml-1 p-2 text-sm font-medium'>
            What package is it?
          </Label>

          <CommandList>
            <CommandEmpty>No package found.</CommandEmpty>
            <CommandGroup>
              {packages.map((pkg) => (
                <CommandItem
                  key={pkg.value}
                  value={pkg.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {pkg.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === pkg.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
