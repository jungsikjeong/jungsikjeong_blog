'use client'
import { IProfile } from '@/types/profile'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { ProfileFormSchema } from './schema'

interface IEditProfileProps {
  profile: IProfile
  onClose: () => void
}

export default function EditProfileForm({
  profile,
  onClose,
}: IEditProfileProps) {
  const form = useForm<ProfileFormSchema>({
    defaultValues: {
      username: profile.username,
      nickname: profile.nickname ?? '',
      bio: profile.bio ?? '',
      location: profile.location ?? '',
      email: profile.email,
      social_accounts: profile.social_accounts?.map((url) => ({ url })),
    },
  })

  const { fields, append, replace, remove } = useFieldArray<ProfileFormSchema>({
    control: form.control,
    name: 'social_accounts',
  })

  const onSubmit = (data: ProfileFormSchema) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4 py-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className='mt-1 h-7' />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input {...field} className='mt-1 h-7' />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} className='mt-1' />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} className='mt-1 h-7' />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} className='mt-1 h-7' type='email' />
                </FormControl>
              </FormItem>
            )}
          />

          <div>
            <Label>Social accounts</Label>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <FormField
                  key={`social-${index}`}
                  control={form.control}
                  name={`social_accounts.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Link to social profile'
                          className='mt-1 h-7'
                          type='url'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
          </div>

          <div className='flex justify-end gap-2'>
            <Button className='h-8 bg-green-700 px-2 hover:bg-green-700/90'>
              Save
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                form.reset()
                onClose()
              }}
              className='h-8 px-2'
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
