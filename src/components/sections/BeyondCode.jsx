import { LuArrowUpRight, LuBookOpen, LuMusic } from 'react-icons/lu'
import { beyond } from '../../data/beyond.js'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'

const bars = [10, 18, 28, 14, 34, 22, 40, 16, 26, 12, 30, 20, 36, 14, 24, 32, 18, 28, 12, 22, 34, 16, 26, 10]

export default function BeyondCode() {
  return (
    <Section
      id="beyond"
      index={beyond.index}
      label={beyond.label}
      title={beyond.title}
      meta={beyond.meta}
    >
      <Reveal as="p" className="section__body beyond__intro">
        {beyond.intro}
      </Reveal>

      <div className="beyond__grid">
        <Reveal className="beyond__interests" delay={40}>
          <h3 className="minihead">
            <LuArrowUpRight className="minihead__icon" aria-hidden="true" />
            Interests
          </h3>
          <ul className="interests">
            {beyond.interests.map((interest, i) => (
              <li className="interest" key={interest}>
                <span className="interest__num">{String(i + 1).padStart(2, '0')}</span>
                <span>{interest}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="beyond__music" delay={100}>
          <div className="panel-head">
            <h3 className="minihead">
              <LuMusic className="minihead__icon" aria-hidden="true" />
              {beyond.music.label}
            </h3>
            <div className="wave" aria-hidden="true">
              {bars.map((height, i) => (
                <span key={i} style={{ '--h': `${height}px`, '--i': i }} />
              ))}
            </div>
          </div>

          <p className="beyond__music-title">{beyond.music.heading}</p>
          <p className="beyond__music-body">{beyond.music.body}</p>

          <ul className="tracks">
            {beyond.music.tracks.map((track) => (
              <li className="track" key={track}>
                <span className="track__mark" aria-hidden="true" />
                {track}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="beyond__book" delay={160}>
          <div className="book" aria-hidden="true">
            <div className="book__spine">
              <span className="book__label">A novel</span>
              <span className="book__title">The Monk Who Sold His Ferrari</span>
              <span className="book__author">Robin Sharma</span>
            </div>
          </div>

          <div className="beyond__book-copy">
            <h3 className="minihead">
              <LuBookOpen className="minihead__icon" aria-hidden="true" />
              {beyond.book.label}
            </h3>
            <p className="book__name">{beyond.book.title}</p>
            <p className="book__author-line">{beyond.book.author}</p>
            <p className="beyond__music-body">{beyond.book.body}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}