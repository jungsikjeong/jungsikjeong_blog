import { PostForm } from '@/features/post'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { requireAuth } from '@/utils/supabase/auth'
import { getStorageImageUrl } from '@/utils/supabase/get-image-url'

export default async function CreatePage() {
  const { user } = await requireAuth()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <section className='container mx-auto py-4'>
      <div className='flex items-center gap-2'>
        <Avatar className='h-8 w-8'>
          <AvatarImage
            src={getStorageImageUrl(user.avatar_url)}
            className='object-cover'
          />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>

        <h2>Create new Post</h2>
      </div>

      <PostForm />
    </section>
  )
}
