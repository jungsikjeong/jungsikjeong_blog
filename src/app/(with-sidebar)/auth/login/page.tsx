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

export default function LoginPage() {
  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold'>환영합니다!</CardTitle>
          <CardDescription>
            로그인하고 다양한 서비스를 이용해보세요.
          </CardDescription>
        </CardHeader>

        <CardContent className='flex flex-col items-center space-y-4'>
          <Image
            src='/favicon.ico'
            alt='로고'
            width={100}
            height={100}
            className='rounded-full bg-yellow-400 p-2'
          />

          <KakaoLoginBtn />
        </CardContent>
        <CardFooter className='text-xs text-gray-500'>
          <p className='mx-auto'>
            로그인함으로써 서비스 이용약관과 개인정보 처리방침에 동의하게
            됩니다.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
