import { LuArrowDown, LuArrowUpRight } from 'react-icons/lu'
import { hero, heroMeta, site } from '../../data/personal.js'
import Button from '../ui/Button.jsx'
import ArrowLink from '../ui/ArrowLink.jsx'

const facts = [
  { label: 'Based in', value: heroMeta.location },
  { label: 'Focus', value: heroMeta.focus },
  { label: 'Stack', value: heroMeta.stack },
  { label: 'Status', value: 'Open to collaborate' },
]

/**
 * Hero. Entrance is a CSS animation (not a scroll reveal) with per-element
 * delays, so the page composes itself on load without JavaScript timers.
 */
export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero__rules" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__main">
          <h1 className="hero__title">
            <span className="hero__line" data-enter style={{ '--d': '0ms' }}>
              {hero.nameLines[0]}
            </span>
            <span className="hero__line" data-enter style={{ '--d': '90ms' }}>
              {hero.nameLines[1].replace('.', '')}
              <span className="hero__dot">.</span>
            </span>
          </h1>

          <p className="hero__alias" data-enter style={{ '--d': '180ms' }}>
            {hero.aliasLine}
          </p>

          <p className="hero__descriptor" data-enter style={{ '--d': '240ms' }}>
            {site.descriptor}
          </p>

          <p className="hero__desc" data-enter style={{ '--d': '320ms' }}>
            {hero.description}
          </p>

          <div className="hero__cta" data-enter style={{ '--d': '400ms' }}>
            <Button href={hero.primaryCta.href} variant="primary" icon={<LuArrowDown />}>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </Button>
            <ArrowLink href="https://github.com/OshekharO/" external className="hero__github">
              GitHub
            </ArrowLink>
          </div>

          <p className="hero__tagline" data-enter style={{ '--d': '480ms' }}>
            {site.tagline}
          </p>
        </div>

        <aside className="hero__panel" data-enter style={{ '--d': '440ms' }} aria-label="Details">
          <span className="panel__mark panel__mark--tl" aria-hidden="true" />
          <span className="panel__mark panel__mark--tr" aria-hidden="true" />
          <span className="panel__mark panel__mark--bl" aria-hidden="true" />
          <span className="panel__mark panel__mark--br" aria-hidden="true" />

          <div className="panel__bar">
            <span className="panel__path">{heroMeta.path}</span>
            <span className="panel__status">
              <span className="panel__pulse" aria-hidden="true" />
              {heroMeta.status}
            </span>
          </div>

          <div className="panel__body">
            {heroMeta.commands.map((command) => (
              <div className="panel__block" key={command.prompt}>
                <p className="panel__line">
                  <span className="panel__prompt" aria-hidden="true">
                    $
                  </span>{' '}
                  {command.prompt}
                </p>
                {command.output.map((line) => (
                  <p className="panel__output" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
            <p className="panel__line">
              <span className="panel__prompt" aria-hidden="true">
                $
              </span>{' '}
              <span className="panel__caret" aria-hidden="true" />
            </p>
          </div>

          <div className="panel__foot">
            <span>{heroMeta.current}</span>
            <LuArrowUpRight className="panel__foot-icon" aria-hidden="true" />
          </div>
        </aside>
      </div>

      <div className="container">
        <dl className="hero__facts">
          {facts.map((fact, i) => (
            <div className="hero__fact" key={fact.label} data-enter style={{ '--d': `${560 + i * 60}ms` }}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}