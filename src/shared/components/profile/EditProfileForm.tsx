import { IProfile } from '@/types/profile'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface IEditProfileProps {
  profile: IProfile
  onClose: () => void
}

export default function EditProfileForm({
  profile,
  onClose,
}: IEditProfileProps) {
  return (
    <div className='space-y-4 py-4'>
      <div>
        <Label>Name</Label>
        <Input defaultValue={profile.username} className='mt-1' />
      </div>

      <div>
        <Label>Nickname</Label>
        <Input defaultValue={profile?.nickname ?? ''} className='mt-1' />
      </div>

      <div>
        <Label>Bio</Label>
        <Textarea defaultValue={profile?.bio ?? ''} className='mt-1' />
      </div>

      <div>
        <Label>Location</Label>
        <Input defaultValue={profile?.location ?? ''} className='mt-1' />
      </div>

      <div>
        <Label>Email</Label>
        <Input defaultValue={profile?.email} className='mt-1' type='email' />
      </div>

      <div>
        <Label>Social accounts</Label>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <Input
              defaultValue={profile?.social_accounts?.[index] ?? ''}
              placeholder='Link to social profile'
              className='mt-1'
              type='url'
              key={`social-${index}`}
            />
          ))}
      </div>

      <div className='flex justify-end gap-2'>
        <Button className='h-8 bg-green-700 px-2 hover:bg-green-700/90'>
          Save
        </Button>
        <Button variant='outline' onClick={onClose} className='h-8 px-2'>
          Cancel
        </Button>
      </div>
    </div>
  )
}
