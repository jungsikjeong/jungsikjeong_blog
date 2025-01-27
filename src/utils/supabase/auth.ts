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

  const { data: userData, error: userError } = await supabase
    .from('members')
    .select('*')
    .eq('id', authData.user.id)
    .single()

  if (userError) {
    console.log('User Error occurred')
    return null
  }

  return userData
}
