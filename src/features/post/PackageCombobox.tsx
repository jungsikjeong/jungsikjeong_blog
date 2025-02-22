'use client'

import { Check, Settings } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { Label } from '@/shared/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { useFormContext } from 'react-hook-form'
import { PostFormValues } from './schema'

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

  const form = useFormContext<PostFormValues>()
  const packageValue = form.watch('package')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={`w-full justify-between border-none sm:w-52 ${
            form.formState.errors.package && 'text-red-500'
          }`}
        >
          {packageValue
            ? packages.find((pkg) => pkg.value === packageValue)?.label
            : 'package'}
          <Settings
            className={`${!form.formState.errors.package && 'opacity-50'}`}
          />
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
                    form.setValue(
                      'package',
                      currentValue as 'repository' | 'project',
                    )
                    form.trigger('package')
                    setOpen(false)
                  }}
                >
                  {pkg.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      packageValue === pkg.value ? 'opacity-100' : 'opacity-0',
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
