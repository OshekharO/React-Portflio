import { education } from '../../data/education.js'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'

export default function Education() {
  return (
    <Section
      id="education"
      index={education.index}
      label={education.label}
      title={education.title}
      meta={education.meta}
    >
      <Reveal as="p" className="section__body education__intro">
        {education.body}
      </Reveal>

      <ol className="timeline">
        {education.entries.map((entry, i) => (
          <Reveal as="li" className="timeline__item" key={entry.id} delay={i * 90}>
            <span className="timeline__node" aria-hidden="true" />

            <div className="timeline__content">
              <div className="timeline__head">
                <p className="timeline__stage">{entry.stage}</p>
                <p className="timeline__short">{entry.short}</p>
              </div>
              <h3 className="timeline__degree">{entry.degree}</h3>
              <p className="timeline__inst">{entry.institution}</p>
              <p className="timeline__desc">{entry.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}