'use client'

import { Button } from '@/shared/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export function KakaoLoginBtn() {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect_to')

  const handleKakaoSignIn = async () => {
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
    const next = redirectTo ?? ''

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
      width={200}
      height={50}
      priority
      src='/images/kakao_login_medium_narrow.png'
      alt='카카오 로그인 버튼'
      className='cursor-pointer'
      onClick={handleKakaoSignIn}
    />
  )
}
