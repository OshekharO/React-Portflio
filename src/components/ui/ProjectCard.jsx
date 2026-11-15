import { LuArrowUpRight } from 'react-icons/lu'
import ProjectArt from './ProjectArt.jsx'
import Reveal from './Reveal.jsx'

/**
 * Editorial project card.
 *
 * There is exactly one interactive element per card: a stretched link over the
 * whole surface. That keeps the card clickable without nesting links inside
 * links, and the accessible name is explicit about the destination.
 *
 * Every card in the grid has the same structure so a row reads as a set; the
 * figure is what changes from project to project.
 */
export default function ProjectCard({ project, delay = 0 }) {
  const { name, index, tagline, description, tech, repo, note, art, featured } = project

  return (
    <Reveal
      as="article"
      className={`card${featured ? ' card--featured' : ''}`}
      delay={delay}
      aria-labelledby={`project-${project.id}-title`}
    >
      <a
        className="card__link"
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} — view the repository on GitHub (opens in a new tab)`}
      />

      <ProjectArt variant={art} />

      <div className="card__body">
        <div className="card__meta">
          <span className="card__index">{index}</span>
          {featured ? <span className="card__flag">Featured</span> : <span className="card__note">{note}</span>}
        </div>

        <h3 className="card__name" id={`project-${project.id}-title`}>
          {name}
        </h3>

        <p className="card__tagline">{tagline}</p>
        <p className="card__desc">{description}</p>

        <ul className="card__tags" aria-label="Technologies">
          {tech.map((item) => (
            <li className="tag" key={item}>
              {item}
            </li>
          ))}
        </ul>

        <span className="card__cta">
          <span>View repository</span>
          <LuArrowUpRight className="card__cta-icon" aria-hidden="true" />
        </span>
      </div>
    </Reveal>
  )
}