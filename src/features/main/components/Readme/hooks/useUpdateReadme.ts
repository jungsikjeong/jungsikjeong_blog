import useCreateClient from '@/lib/supabase/client'
import { masterReadmeQueryKeys } from '@/services/master_readme/queries'
import MasterReadmeService from '@/services/master_readme/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateReadme = () => {
  const supabase = useCreateClient()

  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: ({ contents, email }: { contents: string; email: string }) => {
      return new MasterReadmeService(supabase).updateMasterReadme(
        contents,
        email,
      )
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: masterReadmeQueryKeys.readme,
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
