import useCreateClient from '@/lib/supabase/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { masterReadmeQueryOptions } from './queries'

export const useGetMasterReadme = () => {
  const supabase = useCreateClient()

  return useSuspenseQuery({
    ...masterReadmeQueryOptions(supabase).getMasterReadme(),
  })
}
