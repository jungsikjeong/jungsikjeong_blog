import Image from 'next/image'

import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { KakaoLoginBtn } from '@/features/auth/components/KaKaoLoginBtn'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <section className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='flex w-full justify-center'>
        <div className='relative h-64 w-64'>
          <div className='absolute left-1/3 top-11 z-10 -translate-x-1/2 transition-all duration-300 hover:scale-105'>
            <KakaoLoginBtn />
          </div>

          <div className='group relative h-64 w-64'>
            <Image src='/images/login_page_image.jpg' alt='image' fill />
            <div className='absolute bottom-10 left-1/2 -rotate-45 text-3xl font-semibold'>
              Do It!
            </div>

            <Button
              variant={'ghost'}
              className="absolute -bottom-8 p-0 transition-all duration-300 before:mr-0 before:content-['/'] after:ml-0 after:content-['\5c'] hover:scale-105 hover:bg-transparent"
            >
              <Link href='/'>Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
