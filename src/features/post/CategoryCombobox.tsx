'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Plus, Settings } from 'lucide-react'

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
import { useFormContext } from 'react-hook-form'
import { PostFormValues } from './schema'
const categories = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

export function CategoryCombobox() {
  const [open, setOpen] = React.useState(false)

  const form = useFormContext<PostFormValues>()
  const categoryValue = form.watch('category')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={`w-full justify-between border-none sm:w-52 ${
            form.formState.errors.category && 'text-red-500'
          }`}
        >
          {categoryValue
            ? categories.find((category) => category.value === categoryValue)
                ?.label
            : 'category'}
          <Settings
            className={`${!form.formState.errors.category && 'opacity-50'}`}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <Label className='ml-1 flex items-center gap-2 p-2 text-sm font-medium'>
            What category is it?
            <Button variant='ghost' size='icon' title='Add Category'>
              <Plus className='h-4 w-4' />
            </Button>
          </Label>

          <CommandInput
            containerClassName='border-t-[1px]'
            placeholder='Filter Categories'
            className='h-9'
          />

          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    form.setValue('category', currentValue)
                    form.trigger('category')
                    setOpen(false)
                  }}
                >
                  {category.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      categoryValue === category.value
                        ? 'opacity-100'
                        : 'opacity-0',
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
