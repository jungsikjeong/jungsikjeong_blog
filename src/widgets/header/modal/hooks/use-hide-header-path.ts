import { usePathname } from 'next/navigation'

export default function useHideHeaderPath() {
  const pathname = usePathname()

  const hideHeaderPaths = ['/signin', '/signup']

  return hideHeaderPaths.includes(pathname)
}
