/**
 * All calls to action are links: the portfolio has no forms and no client-side
 * routing. `external` adds the safe new-tab attributes and an accessible hint.
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  icon = null,
  external = false,
  className = '',
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ')

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span className="btn__label">{children}</span>
      {icon ? (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  )
}