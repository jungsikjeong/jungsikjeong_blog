import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

const createErrorRedirect = (
  origin: string,
  redirectTo: string | null,
  message: string,
) => {
  return NextResponse.redirect(
    `${origin}/error?redirect_to=${encodeURIComponent(redirectTo ?? '')}&message=${encodeURIComponent(message)}`,
  )
}

const getRedirectUrl = (
  origin: string,
  next: string,
  forwardedHost: string | null,
  isLocalEnv: boolean,
) => {
  if (isLocalEnv) {
    return `${origin}${next}`
  }
  if (forwardedHost) {
    return `https://${forwardedHost}${next}`
  }
  return `${origin}${next}`
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const headerList = await headers()
  const redirectTo = headerList.get('x-url')

  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    return createErrorRedirect(
      origin,
      redirectTo,
      '인증 과정에서 문제가 발생했습니다.',
    )
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('Session exchange error:', error)
    return createErrorRedirect(
      origin,
      redirectTo,
      '인증 과정에서 문제가 발생했습니다.',
    )
  }

  const userEmail = data.user?.email as string
  const { data: existingMember } = await supabase
    .from('members')
    .select('*')
    .eq('email', userEmail)
    .single()

  if (!existingMember) {
    const { error: insertError } = await supabase
      .from('members')
      .insert([
        {
          id: data.user.id,
          email: data.user.email as string,
          nickname: data.user.user_metadata.preferred_username,
          avatar_url: data.user.user_metadata.avatar_url,
        },
      ])
      .select()
      .single()

    if (insertError) {
      console.error('insertError error:', insertError)
      return createErrorRedirect(
        origin,
        redirectTo,
        '유저 가입 중 문제가 발생했습니다.',
      )
    }
  }

  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocalEnv = process.env.NODE_ENV === 'development'
  const redirectUrl = getRedirectUrl(origin, next, forwardedHost, isLocalEnv)

  return NextResponse.redirect(redirectUrl)
}
