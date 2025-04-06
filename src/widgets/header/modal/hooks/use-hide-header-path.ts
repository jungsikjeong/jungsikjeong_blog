import { usePathname } from 'next/navigation'

export default function useHideHeaderPath() {
  const pathname = usePathname()

  const hideHeaderPaths = ['/auth/signin', '/auth/signup']

  return hideHeaderPaths.includes(pathname)
}
