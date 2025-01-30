import { Tables } from '@/types/supabase'
import { create } from 'zustand'

interface UserStore {
  user: Tables<'members'> | null
  setUser: (user: Tables<'members'> | null) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
