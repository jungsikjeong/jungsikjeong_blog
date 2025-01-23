'use client'

import useGtagEffect from '@/hook/useGtagEffect'

export function GtagProvider({ children }: React.PropsWithChildren) {
  useGtagEffect()
  return children
}
