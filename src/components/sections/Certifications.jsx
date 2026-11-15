import { certifications } from '../../data/certifications.js'
import CertificationRow from '../ui/CertificationRow.jsx'
import Section from '../ui/Section.jsx'

export default function Certifications() {
  return (
    <Section
      id="certifications"
      index={certifications.index}
      label={certifications.label}
      title={certifications.title}
      meta={certifications.meta}
    >
      <div className="certs">
        <div className="certs__head" aria-hidden="true">
          <span>No.</span>
          <span>Credential</span>
          <span>Platform</span>
          <span>Check</span>
        </div>

        <ul className="certs__list">
          {certifications.items.map((item, i) => (
            <CertificationRow key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </Section>
  )
}