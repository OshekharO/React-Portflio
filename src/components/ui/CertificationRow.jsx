import { LuArrowUpRight } from 'react-icons/lu'
import Reveal from './Reveal.jsx'

/**
 * One certification row. Deliberately a row, not a card: four credentials read
 * as a list, and a grid of identical cards would imply a comparison that the
 * data does not support.
 */
export default function CertificationRow({ item, index }) {
  return (
    <Reveal as="li" className="cert" delay={index * 60}>
      <span className="cert__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="cert__main">
        <h3 className="cert__title">{item.title}</h3>
        <p className="cert__issuer">{item.issuer}</p>
      </div>

      <span className="cert__platform">{item.platform}</span>

      <a
        className="cert__link"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Verify ${item.title} on ${item.platform} (opens in a new tab)`}
      >
        <span className="cert__link-text">Verify</span>
        <LuArrowUpRight className="cert__link-icon" aria-hidden="true" />
      </a>
    </Reveal>
  )
}