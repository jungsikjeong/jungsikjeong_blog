import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import MasterReadmeService from './services'

export const masterReadmeQueryKeys = {
  readme: ['readme'],
} as const

export const masterReadmeQueryOptions = (
  supabase: SupabaseClient<Database>,
) => {
  return {
    getMasterReadme: () => ({
      queryKey: masterReadmeQueryKeys.readme,

      queryFn: () => new MasterReadmeService(supabase).getMasterReadme(),
      staleTime: 1000 * 60 * 5,
    }),
  }
}
