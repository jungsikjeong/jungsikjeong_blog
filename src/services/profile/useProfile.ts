import useCreateClient from '@/lib/supabase/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { profileQueryOptions } from './queries'

export const useGetProfileByMemberId = (userId: string) => {
  const supabase = useCreateClient()

  return useSuspenseQuery({
    ...profileQueryOptions(supabase, userId).getProfileByMemberId(),
  })
}
