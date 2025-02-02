'use client'
import { IProfile } from '@/types/profile'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { ProfileFormSchema, profileSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { useUpdateProfile } from './hooks/useUpdateProfile'

interface IEditProfileProps {
  profile: IProfile
  onClose: () => void
}

export default function EditProfileForm({
  profile,
  onClose,
}: IEditProfileProps) {
  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: profile.username,
      nickname: profile.nickname,
      bio: profile.bio ?? undefined,
      location: profile.location ?? undefined,
      display_email: profile.display_email,
      social_accounts: profile.social_accounts?.map((account) => ({
        url: account,
      })) ?? [{ url: '' }, { url: '' }, { url: '' }, { url: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'social_accounts',
  })

  const { mutate: updateProfile } = useUpdateProfile()

  const onSubmit = (data: ProfileFormSchema) => {
    updateProfile(data, {
      onSuccess: () => {
        onClose()
      },
    })

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
                  <Input {...field} className='mt-1 h-8' placeholder='Name' />
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
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    className='mt-1 h-8'
                    placeholder='Nickname'
                  />
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
                  <Textarea {...field} className='mt-1' placeholder='Bio' />
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
                  <Input
                    {...field}
                    className='mt-1 h-8'
                    placeholder='Location'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='display_email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='mt-1 h-8'
                    type='email'
                    placeholder='Email'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div>
            <Label>Social accounts</Label>
            {fields.map((field, index) => (
              <div key={field.id} className='mt-2'>
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      {...form.register(`social_accounts.${index}.url`)}
                      placeholder='Link to social profile'
                      className='h-8'
                      type='text'
                    />
                  </FormControl>
                </FormItem>
              </div>
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
