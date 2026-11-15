import { LuArrowUpRight } from 'react-icons/lu'

/**
 * Inline text link with an arrow that shifts on hover. Underline is a border so
 * it can transition in colour without moving the baseline.
 */
export default function ArrowLink({ href, children, external = false, className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`arrow-link ${className}`.trim()}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span className="arrow-link__text">{children}</span>
      <LuArrowUpRight className="arrow-link__icon" aria-hidden="true" />
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  )
}