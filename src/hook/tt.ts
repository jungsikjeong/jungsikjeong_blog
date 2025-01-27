// import { SupabaseClient, User } from '@supabase/supabase-js'
// import { useQuery, useQueryClient } from '@tanstack/react-query'

// export const useAuth = (supabase: SupabaseClient) => {
//   return useQuery<User | null>({
//     queryKey: ['auth'],
//     queryFn: async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession()

//       return session?.user ?? null
//     },
//     staleTime: 5 * 60 * 1000,
//     gcTime: 5 * 60 * 1000,
//     retry: 1,
//     refetchOnWindowFocus: true,
//   })
// }
