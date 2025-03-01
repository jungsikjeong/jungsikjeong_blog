'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import RichTextEditor from '@/shared/editor'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CategoryCombobox } from './CategoryCombobox'
import { PackageCombobox } from './PackageCombobox'
import { postFormSchema, PostFormValues } from './schema'

export default function PostForm() {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      category: undefined,
      package: undefined,
    },
  })

  const onSubmit = (data: PostFormValues) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='py-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Add a title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`!mt-1 h-8 focus-visible:ring-offset-0 ${
                    fieldState.error
                      ? 'focus:ring-red-500 focus-visible:ring-red-500'
                      : ''
                  }`}
                  placeholder='Title'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <section>
          <RichTextEditor
            className='h-96'
            placeholder='Type your contents here...'
            onCancel={() => {}}
            onSave={() => {
              form.handleSubmit(onSubmit)()
            }}
          />

          <div className='mt-3 flex flex-wrap gap-2'>
            <CategoryCombobox />
            <PackageCombobox />
          </div>
        </section>
      </form>
    </Form>
  )
}
