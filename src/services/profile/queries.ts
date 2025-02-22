import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import profileService from './services'

export const profileQueryKeys = {
  profile: ['profile'],
} as const

export const profileQueryOptions = (
  supabase: SupabaseClient<Database>,
  userId: string,
) => {
  return {
    getProfileByMemberId: () => ({
      queryKey: profileQueryKeys.profile,
      queryFn: () => new profileService(supabase).getProfileByMemberId(userId),
      staleTime: 1000 * 60 * 5,
    }),
  }
}
