import { LuArrowUpRight } from 'react-icons/lu'
import { contact } from '../../data/personal.js'
import CopyEmail from '../ui/CopyEmail.jsx'
import Reveal from '../ui/Reveal.jsx'
import Section from '../ui/Section.jsx'
import { uiIcons } from '../ui/techIcons.js'

export default function Contact() {
  return (
    <Section
      id="contact"
      index={contact.index}
      label={contact.label}
      title={
        <>
          {contact.title}
          <br />
          <span className="accent-text">{contact.titleAccent}</span>
        </>
      }
      meta="No forms, just email"
    >
      <div className="contact__grid">
        <Reveal className="contact__main">
          <p className="contact__body">{contact.body}</p>

          <CopyEmail email={contact.email} />

          <p className="contact__aside">
            Prefer async? Open an issue on{' '}
            <a
              className="link"
              href="https://github.com/OshekharO/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{' '}
            — it is the fastest way to reach me about a repository.
          </p>
        </Reveal>

        <Reveal className="contact__channels" delay={90}>
          <h3 className="minihead">Channels</h3>
          <ul className="channels">
            {contact.channels.map((channel) => {
              const Icon = uiIcons[channel.icon]
              return (
                <li className="channel" key={channel.id}>
                  <a
                    className="channel__link"
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <Icon className="channel__icon" aria-hidden="true" />
                    <span className="channel__text">
                      <span className="channel__label">{channel.label}</span>
                      <span className="channel__value">{channel.value}</span>
                    </span>
                    <LuArrowUpRight className="channel__arrow" aria-hidden="true" />
                    {channel.external ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}