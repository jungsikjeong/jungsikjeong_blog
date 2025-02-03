import useCreateClient from '@/lib/supabase/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { masterProfileQueryOptions } from './queries'

export const useGetMasterProfile = () => {
  const supabase = useCreateClient()

  return useSuspenseQuery({
    ...masterProfileQueryOptions(supabase).getMasterProfile(),
  })
}
