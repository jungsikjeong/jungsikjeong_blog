import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/types/supabase'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const getCurrentUser = async (): Promise<Tables<'members'> | null> => {
  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError) {
    console.log('Auth Error occurred')
    return null
  }

  const { data: user, error: userError } = await supabase
    .from('members')
    .select('*')
    .eq('id', authData.user.id)
    .single()

  if (userError) {
    console.log('User Error occurred')
    return null
  }

  return user
}

export const requireAuth = async (): Promise<{
  user: Tables<'members'>
}> => {
  const currentUser = await getCurrentUser()
  if (currentUser == null) {
    const headerList = await headers()
    redirect(
      `/auth/login?redirect_to=${encodeURIComponent(headerList.get('x-url') ?? '')}&message=${encodeURIComponent('로그인이 필요한 기능입니다.')}`,
    )
  }

  if (!currentUser.is_admin) {
    const headerList = await headers()
    redirect(
      `/?redirect_to=${encodeURIComponent(headerList.get('x-url') ?? '')}&message=${encodeURIComponent('권한이 없는 페이지입니다.')}`,
    )
  }

  return { user: currentUser }
}
