import { about } from '../../data/personal.js'
import Emphasis from '../ui/Emphasis.jsx'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'

export default function About() {
  return (
    <Section
      id="about"
      index={about.index}
      label={about.label}
      title={about.title}
      meta={about.meta}
    >
      <div className="about__grid">
        <aside className="about__rail">
          <h3 className="minihead">At a glance</h3>
          <dl className="about__facts">
            {about.facts.map((fact) => (
              <div className="about__fact" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="about__prose">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal
              as="p"
              key={i}
              delay={i * 60}
              className={`about__p${i === 0 ? ' about__p--lead' : ''}`}
            >
              <Emphasis text={paragraph} />
            </Reveal>
          ))}

          <Reveal as="p" className="about__statement" delay={80}>
            &ldquo;{about.pullStatement}&rdquo;
          </Reveal>
        </div>
      </div>

      <Reveal className="about__path" delay={60}>
        <h3 className="minihead">The route here</h3>
        <ol className="path">
          {about.path.map((step, i) => (
            <li className="path__step" key={step.label}>
              <span className="path__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="path__label">{step.label}</span>
              <span className="path__detail">{step.detail}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}