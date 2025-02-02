import useCreateClient from '@/lib/supabase/client'
import ProfileService from '@/services/profile/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { profileQueryKeys } from '@/services/profile/queries'

export const useUpdateProfileStatus = () => {
  const supabase = useCreateClient()

  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: (status: string) =>
      new ProfileService(supabase).updateStatus(status),
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: profileQueryKeys.profile,
      })
    },
  })
}
