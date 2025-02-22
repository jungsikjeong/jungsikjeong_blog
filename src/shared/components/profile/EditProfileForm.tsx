'use client'
import { IProfile } from '@/types/profile'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { ProfileFormSchema, profileSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { useUpdateMasterProfile } from './hooks/useUpdateMasterProfile'

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
      display_email: profile.display_email ?? undefined,
      social_accounts: profile.social_accounts?.map((account) => ({
        url: account,
      })) ?? [{ url: '' }, { url: '' }, { url: '' }, { url: '' }],
    },
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'social_accounts',
  })

  const { mutate: updateProfile } = useUpdateMasterProfile()

  const onSubmit = (data: ProfileFormSchema) => {
    updateProfile(data, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4 py-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={`mt-1 h-8 ${
                      fieldState.error
                        ? 'focus:ring-red-500 focus-visible:ring-red-500'
                        : ''
                    }`}
                    placeholder='Name'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='nickname'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    className={`mt-1 h-8 ${
                      fieldState.error
                        ? 'focus:ring-red-500 focus-visible:ring-red-500'
                        : ''
                    }`}
                    placeholder='Nickname'
                  />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                    value={field.value ?? ''}
                    type='email'
                    placeholder='Email'
                  />
                </FormControl>{' '}
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label>Social accounts</Label>

            {fields.map((field, index) => (
              <div key={field.id} className='mt-2'>
                <FormField
                  control={form.control}
                  name={`social_accounts.${index}.url`}
                  render={({ field, fieldState }) => (
                    <FormItem className='w-full'>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Link to social profile'
                          className={`h-8 ${
                            fieldState.error
                              ? 'focus:ring-red-500 focus-visible:ring-red-500'
                              : ''
                          }`}
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
