'use client'

import useGtagEffect from '@/hooks/useGtagEffect'

export const GtagProvider = ({ children }: { children: React.ReactNode }) => {
  useGtagEffect()
  return <>{children}</>
}
