'use client'

import useGtagEffect from '@/hook/useGtagEffect'

export const GtagProvider = ({ children }: { children: React.ReactNode }) => {
  useGtagEffect()
  return <>{children}</>
}
