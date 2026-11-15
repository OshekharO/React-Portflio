import { Fragment } from 'react'

/**
 * Renders *marked* phrases from the data files as emphasised text, so copy can
 * stay in plain strings while the design can still highlight specific words.
 */
export default function Emphasis({ text, as: Tag = 'span', className = 'hl' }) {
  const parts = String(text).split('*')

  return (
    <Tag>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em className={className} key={i}>
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </Tag>
  )
}