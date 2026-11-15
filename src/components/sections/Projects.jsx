import { projects, projectsMeta } from '../../data/projects.js'
import ArrowLink from '../ui/ArrowLink.jsx'
import ProjectCard from '../ui/ProjectCard.jsx'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'

export default function Projects() {
  return (
    <Section
      id="projects"
      index={projectsMeta.index}
      label={projectsMeta.label}
      title={projectsMeta.title}
      meta={projectsMeta.meta}
    >
      <Reveal as="p" className="section__body projects__intro">
        {projectsMeta.body}
      </Reveal>

      <div className="projects__grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={(i % 2) * 80} />
        ))}
      </div>

      <div className="projects__foot">
        <ArrowLink href="https://github.com/OshekharO?tab=repositories" external>
          All repositories on GitHub
        </ArrowLink>
      </div>
    </Section>
  )
}