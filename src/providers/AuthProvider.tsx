'use client'

import { createClient } from '@/lib/supabase/client'
import { Tables } from '@/types/supabase'
import { useQueryClient } from '@tanstack/react-query'
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

const AuthContext = React.createContext<{
  user: Tables<'members'> | null
  setUser: Dispatch<SetStateAction<Tables<'members'> | null>>
}>({
  user: null,
  setUser: () => {},
})

interface IAuthProviderProps {
  initialUser: Tables<'members'> | null
  children: React.ReactNode
}

export function AuthProvider({ initialUser, children }: IAuthProviderProps) {
  const supabase = createClient()
  const queryClient = useQueryClient()

  const [user, setUser] = useState<Tables<'members'> | null>(initialUser)

  useEffect(() => {
    // 인증 상태 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [queryClient, supabase])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
