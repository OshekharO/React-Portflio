import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently occupying the reading band.
 * Uses a scroll read rather than IntersectionObserver so that fast scrolling
 * and short sections cannot leave the indicator pointing at nothing.
 */
export function useActiveSection(ids, offset = 0.34) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    if (!ids.length) return undefined

    let frame = 0
    const read = () => {
      frame = 0
      const line = window.scrollY + window.innerHeight * offset
      let current = ids[0]

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = id
      }

      // At the very bottom, the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1]
      }

      setActive(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ids, offset])

  return active
}