import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when an element scrolls into view. Returns a ref and a boolean.
 * Falls back to "visible" when IntersectionObserver is unavailable, so content
 * is never stuck hidden.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -6% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}