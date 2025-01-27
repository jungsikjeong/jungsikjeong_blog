import { Header } from '@/shared/components/header'
import React from 'react'

export default function layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
