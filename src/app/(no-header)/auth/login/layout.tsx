import { getSEOTags } from '@/lib/seo'
import React from 'react'

export const metadata = getSEOTags({
  title: '로그인 페이지',
  description: '로그인 페이지입니다.',
  keywords: ['로그인', '인증'],
  openGraph: {},
  canonicalUrlRelative: '/auth/login',
  extraTags: [],
})

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <section>{children}</section>
}
