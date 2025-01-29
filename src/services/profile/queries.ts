import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import ProfileService from './services'

export const profileQueryKeys = {
  profile: ['profile'],
} as const

export const profileQueryOptions = (supabase: SupabaseClient<Database>) => {
  return {
    getProfile: () => ({
      queryKey: profileQueryKeys.profile,
      queryFn: () => new ProfileService(supabase).getProfile(),
      staleTime: 1000 * 60 * 5,
    }),
  }
}
