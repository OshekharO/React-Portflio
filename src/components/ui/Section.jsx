import Container from '../layout/Container.jsx'

/**
 * Shared section shell: identifier rule, title, and optional right-aligned
 * metadata. `title` accepts nodes so a word can carry the accent.
 */
export default function Section({ id, index, label, title, meta, children, className = '' }) {
  const headingId = `${id}-title`

  return (
    <section id={id} className={`section ${className}`.trim()} aria-labelledby={headingId}>
      <Container>
        <div className="section__top">
          <p className="section__id">
            <span className="section__num">{index}</span>
            <span className="section__sep" aria-hidden="true">
              /
            </span>
            <span className="section__label">{label}</span>
          </p>
          {meta ? <p className="section__meta">{meta}</p> : null}
        </div>

        <h2 className="section__title" id={headingId}>
          {title}
        </h2>

        {children}
      </Container>
    </section>
  )
}