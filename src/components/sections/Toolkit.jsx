import { proficiencies, proficiencyNote, skillGroups, skills } from '../../data/skills.js'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import SkillGroup, { ProficiencyBar } from '../ui/SkillGroup.jsx'

export default function Toolkit() {
  return (
    <Section
      id="skills"
      index={skills.index}
      label={skills.label}
      title={skills.title}
      meta={skills.meta}
    >
      <ul className="toolkit__grid">
        {skillGroups.map((group, i) => (
          <SkillGroup key={group.id} group={group} delay={i * 60} />
        ))}
      </ul>

      <div className="toolkit__levels">
        <div className="toolkit__levels-head">
          <h3 className="minihead">Proficiency</h3>
          <p className="toolkit__note">{proficiencyNote}</p>
        </div>

        <ul className="prof__list">
          {proficiencies.map((item, i) => (
            <ProficiencyBar key={item.name} item={item} delay={i * 45} />
          ))}
        </ul>
      </div>
    </Section>
  )
}