'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUserStore } from '@/store/userStore'
import {  useQueryClient } from '@tanstack/react-query'

export function AuthProvider({ children }: React.PropsWithChildren) {
  const supabase = createClient()
  const queryClient = useQueryClient()

  useEffect(() => {
    // 초기 인증 상태 동기화
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        queryClient.invalidateQueries({ queryKey: ['auth'] })
      }
    }

    initializeAuth()

    // 인증 상태 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        queryClient.invalidateQueries({ queryKey: ['auth'] })
      } else if (event === 'SIGNED_OUT') {
        queryClient.setQueryData(['auth'], null)
      }
    })

    return () => subscription.unsubscribe()
  }, [queryClient, supabase])

  return (children)
}
