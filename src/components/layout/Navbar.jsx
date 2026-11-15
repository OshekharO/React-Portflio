import { useEffect, useRef, useState } from 'react'
import { LuArrowUpRight, LuMenu, LuX } from 'react-icons/lu'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import { useScrolled, useScrollProgress } from '../../hooks/useScroll.js'
import { nav, site } from '../../data/personal.js'

// `nav` is already in page order (see data/personal.js), so the desktop links
// and the overlay menu share one list and cannot disagree about the sequence.
const sectionIds = nav.map((item) => item.id)
const menuItems = nav

export default function Navbar() {
  const scrolled = useScrolled(24)
  const progress = useScrollProgress()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)

  const panelRef = useRef(null)
  const toggleRef = useRef(null)

  // Escape to close, scroll lock, initial focus, and a simple focus trap.
  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    const panel = panelRef.current

    const focusables = () =>
      Array.from(panel?.querySelectorAll('a[href], button:not([disabled])') ?? [])

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    focusables()[0]?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
      else toggleRef.current?.focus()
    }
  }, [open])

  // Never leave the overlay open when the viewport grows into desktop.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 901px)')
    const onChange = () => {
      if (mql.matches) setOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <div
        className={`progress${scrolled ? ' is-visible' : ''}`}
        role="presentation"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header className={`nav${scrolled || open ? ' is-scrolled' : ''}`}>
        <div className="container nav__inner">
          <a className="brand" href="#home" aria-label={`${site.brand} — back to top`}>
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__name">{site.brand}</span>
            <span className="brand__dev" aria-hidden="true">
              /dev
            </span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`nav__link${active === item.id ? ' is-active' : ''}`}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="nav__cta" href="#contact">
              <span>Let&rsquo;s Talk</span>
              <LuArrowUpRight className="nav__cta-icon" aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              {open ? (
                <LuX className="nav__toggle-icon" aria-hidden="true" />
              ) : (
                <LuMenu className="nav__toggle-icon" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="menu" id="mobile-menu" ref={panelRef}>
          <nav className="menu__nav" aria-label="Sections">
            <ul>
              {menuItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    className={`menu__link${active === item.id ? ' is-active' : ''}`}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="menu__label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu__foot">
            <p className="menu__tagline">{site.tagline}</p>
            <a className="menu__cta" href="#contact" onClick={() => setOpen(false)}>
              <span>Let&rsquo;s Talk</span>
              <LuArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </>
  )
}