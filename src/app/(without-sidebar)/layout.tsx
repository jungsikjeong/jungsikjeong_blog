import { BlogSidebar } from '@/shared/components/sidebar/BlogSidebar'
import React from 'react'

export default function WithOutSidebarLayout({
  children,
}: React.PropsWithChildren) {
  return <div>{children}</div>
}
