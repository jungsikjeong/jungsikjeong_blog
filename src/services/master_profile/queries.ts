import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import MasterProfileService from './services'

export const masterProfileQueryKeys = {
  profile: ['profile'],
} as const

export const masterProfileQueryOptions = (
  supabase: SupabaseClient<Database>,
) => {
  return {
    getMasterProfile: () => ({
      queryKey: masterProfileQueryKeys.profile,
      queryFn: () => new MasterProfileService(supabase).getMasterProfile(),
      staleTime: 1000 * 60 * 5,
    }),
  }
}
