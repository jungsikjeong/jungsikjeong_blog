import useCreateClient from '@/lib/supabase/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { profileQueryOptions } from './queries'

export const useGetProfile = () => {
  const supabase = useCreateClient()

  return useSuspenseQuery({
    ...profileQueryOptions(supabase).getProfile(),
  })
}
