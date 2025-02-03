import useCreateClient from '@/lib/supabase/client'
import MasterProfileService from '@/services/master_profile/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { masterProfileQueryKeys } from '@/services/master_profile/queries'

export const useUpdateMasterProfileStatus = () => {
  const supabase = useCreateClient()

  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: (status: string) =>
      new MasterProfileService(supabase).updateMasterStatus(status),
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: masterProfileQueryKeys.profile,
      })
    },
  })
}
