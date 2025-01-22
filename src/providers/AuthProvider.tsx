'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUserStore } from '@/store/userStore'

export function AuthStateManager({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { setLoading, setUser } = useUserStore()

  useEffect(() => {
    setLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('members')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            setUser(data)
            setLoading(false)
          })
      }
    })
    setLoading(false)

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
      }

      setTimeout(async () => {
        if (session?.user) {
          const { data } = await supabase
            .from('members')
            .select('*')
            .eq('id', session.user.id)
            .single()

          setUser(data)
        }
      }, 0)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setLoading, supabase])

  return children
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthStateManager>{children}</AuthStateManager>
}
