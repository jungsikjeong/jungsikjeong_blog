import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    function onChange(e: MediaQueryListEvent | MediaQueryList) {
      setValue(e.matches)
    }

    const mediaQuery = window.matchMedia(query)
    setValue(mediaQuery.matches)

    // Older browsers support mediaQuery.addListener
    if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(onChange)
      return () => mediaQuery.removeListener(onChange)
    }
    // Modern browsers support mediaQuery.addEventListener
    else {
      mediaQuery.addEventListener('change', onChange)
      return () => mediaQuery.removeEventListener('change', onChange)
    }
  }, [query])

  return value
}
