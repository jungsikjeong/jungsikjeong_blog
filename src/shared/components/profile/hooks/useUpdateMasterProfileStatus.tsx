import useCreateClient from '@/lib/supabase/client'
import ProfileService from '@/services/profile/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { profileQueryKeys } from '@/services/profile/queries'

export const useUpdateProfileStatus = () => {
  const supabase = useCreateClient()

  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: ({ status, memberId }: { status: string; memberId: string }) =>
      new ProfileService(supabase).updateStatus(status, memberId),
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: profileQueryKeys.profile,
      })
    },
    onError(error) {
      console.error('useUpdateProfileStatus error', error)
    },
  })
}
