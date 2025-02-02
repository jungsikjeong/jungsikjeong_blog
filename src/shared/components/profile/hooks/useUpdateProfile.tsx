import useCreateClient from '@/lib/supabase/client'
import { profileQueryKeys } from '@/services/profile/queries'
import ProfileService from '@/services/profile/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileFormSchema } from '../schema'

export const useUpdateProfile = () => {
  const supabase = useCreateClient()

  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: (profileFormData: ProfileFormSchema) => {
      return new ProfileService(supabase).updateProfile(profileFormData)
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: profileQueryKeys.profile,
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
