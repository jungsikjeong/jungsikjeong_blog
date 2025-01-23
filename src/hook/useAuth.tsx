import { SupabaseClient } from '@supabase/supabase-js'
import { Tables } from '@/types/supabase'
import { useQuery } from '@tanstack/react-query'

export const useAuth = (supabase: SupabaseClient) => {
  return useQuery<Tables<'members'> | null>({
    queryKey: ['auth'],
    queryFn: async (): Promise<Tables<'members'> | null> => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session?.user) return null

      const { data } = await supabase
        .from('members')
        .select('*')
        .eq('id', session.user.id)
        .single()

      return data
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  })
}
