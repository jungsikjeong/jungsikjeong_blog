import useCreateClient from '@/lib/supabase/client'
import { masterProfileQueryKeys } from '@/services/master_profile/queries'
import MasterProfileService from '@/services/master_profile/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileFormSchema } from '../schema'

export const useUpdateMasterProfileImage = () => {
  const supabase = useCreateClient()

  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: (fileName: string) => {
      return new MasterProfileService(supabase).updateMasterImage(fileName)
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: masterProfileQueryKeys.profile,
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
