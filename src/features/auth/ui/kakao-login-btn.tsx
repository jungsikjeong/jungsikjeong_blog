'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useKakaoLogin } from '../modal/hooks/use-kakao-login'

export function KakaoLoginBtn() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect_to')

  const { mutate } = useKakaoLogin()

  const handleKakaoSignIn = async () => {
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
    const next = redirectTo ?? ''

    mutate()
    console.log(siteUrl, next)
  }

  return (
    <div className='relative h-[50px] w-[200px]'>
      <Image
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority
        src='/images/kakao_login_medium_narrow.png'
        alt='카카오 로그인 버튼'
        className='cursor-pointer'
        onClick={handleKakaoSignIn}
      />
    </div>
  )
}
