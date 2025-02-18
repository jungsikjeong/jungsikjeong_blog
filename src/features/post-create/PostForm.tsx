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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const postFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(20, '제목은 20자 이내로 입력해주세요'),
})

type PostFormValues = z.infer<typeof postFormSchema>

export default function PostForm() {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
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

        <RichTextEditor
          placeholder='Type your contents here...'
          onCancel={() => {}}
          onSave={() => {
            form.handleSubmit(onSubmit)()
          }}
        />
      </form>
    </Form>
  )
}
