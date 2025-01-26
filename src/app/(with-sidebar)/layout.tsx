import { BlogSidebar } from '@/shared/components/sidebar/BlogSidebar'
import React from 'react'

export default function WithSidebarLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className='lg:pl-64'>
      <BlogSidebar />
      {children}
    </div>
  )
}
