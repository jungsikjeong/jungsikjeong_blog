'use client'

import { Button } from '@/shared/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export function KakaoLoginBtn() {
  const searchParams = useSearchParams()
  const next = searchParams.get('redirect_to') ?? ''

  const supabase = createClient()
  const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL || window.location.origin

  const handleKakaoSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      console.error('Kakao Sign In Error:', error.message)
    }
  }

  return (
    <Image
      width={250}
      height={50}
      priority
      src='/images/kakao_login_medium_wide.png'
      alt='카카오 로그인 버튼'
      className='cursor-pointer'
      onClick={handleKakaoSignIn}
    />
  )
}
