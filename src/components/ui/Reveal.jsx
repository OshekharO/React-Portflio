import { useInView } from '../../hooks/useInView.js'

/**
 * Scroll-reveal wrapper. Adds `is-in` once the element enters the viewport;
 * all motion lives in CSS (styles/animations.css) so reduced-motion users get
 * the final state immediately and no JavaScript runs per frame.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}