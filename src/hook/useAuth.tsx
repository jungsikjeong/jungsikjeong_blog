import { QueryClient, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { Tables } from '@/types/supabase'

export const useAuth = () => {
  const supabase = createClient()

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
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 5 * 60 * 1000, // 5분
    retry: 1,
    refetchOnWindowFocus: true,
  })
}
