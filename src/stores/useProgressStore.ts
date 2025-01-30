import { create } from 'zustand'

type ProgressStore = {
  isLoading: boolean
  progress: number
  startLoading: () => void
  finishLoading: () => void
}

export const useProgressStore = create<ProgressStore>((set) => ({
  isLoading: false,
  progress: 0,
  startLoading: () => {
    set({ isLoading: true, progress: 20 })
    // 자연스러운 진행 시뮬레이션을 위해서
    setTimeout(() => set({ progress: 65 }), 200)
    setTimeout(() => set({ progress: 85 }), 400)
  },
  finishLoading: () => {
    set({ progress: 100 })
    setTimeout(() => {
      set({ isLoading: false, progress: 0 })
    }, 200)
  },
}))
