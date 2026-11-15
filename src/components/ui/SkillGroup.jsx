import Reveal from './Reveal.jsx'
import { techIcons } from './techIcons.js'
import { proficiencyLevels } from '../../data/skills.js'

/**
 * One capability group: a bordered block with a mono label, a plain-language
 * caption, and the technologies it contains. Self-animating so each group can
 * stagger without the parent managing observers.
 */
export default function SkillGroup({ group, delay = 0 }) {
  return (
    <Reveal as="li" className="skillgroup" delay={delay}>
      <div className="skillgroup__head">
        <h3 className="skillgroup__label">{group.label}</h3>
        <span className="skillgroup__caption">{group.caption}</span>
      </div>

      <ul className="skillgroup__items">
        {group.items.map((item) => {
          const Icon = techIcons[item.icon]
          return (
            <li className="tech" key={item.name}>
              {Icon ? <Icon className="tech__icon" aria-hidden="true" /> : null}
              <span className="tech__name">{item.name}</span>
            </li>
          )
        })}
      </ul>
    </Reveal>
  )
}

/**
 * A thin bar, not a ring. The bar is a relative comparison between rows; the
 * level name carries the value for everyone, including assistive tech.
 */
export function ProficiencyBar({ item, delay = 0 }) {
  const level = proficiencyLevels[item.level] ?? proficiencyLevels.working

  return (
    <Reveal
      as="li"
      className="prof"
      delay={delay}
      style={{ '--fill': level.fill }}
    >
      <span className="prof__name">{item.name}</span>
      <span className="prof__track" aria-hidden="true">
        <span className="prof__fill" />
      </span>
      <span className="prof__value">{level.label}</span>
    </Reveal>
  )
}