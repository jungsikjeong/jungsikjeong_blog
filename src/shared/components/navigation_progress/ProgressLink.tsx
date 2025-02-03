'use client'

import { useProgressStore } from '@/stores/useProgressStore'
import Link from 'next/link'
import { ComponentProps } from 'react'

export function ProgressLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const { startLoading } = useProgressStore()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    startLoading() // 프로그레스바 시작
    onClick?.(e) // 기존 onClick 핸들러가 있다면 실행
  }

  return <Link href={href} {...props} onClick={handleClick} />
}
