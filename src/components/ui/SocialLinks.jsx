import { uiIcons } from './techIcons.js'

/** Row of icon links (GitHub / LinkedIn). Used in nav, contact, and footer. */
export default function SocialLinks({ items, className = '', showLabels = false }) {
  return (
    <ul className={`social ${className}`.trim()}>
      {items.map((item) => {
        const Icon = uiIcons[item.icon]
        return (
          <li key={item.label}>
            <a
              className="social__link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label} (opens in a new tab)`}
            >
              <Icon className="social__icon" aria-hidden="true" />
              {showLabels ? <span className="social__label">{item.label}</span> : null}
            </a>
          </li>
        )
      })}
    </ul>
  )
}