import { LuArrowUp } from 'react-icons/lu'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { contact, footer, site } from '../../data/personal.js'
import SocialLinks from '../ui/SocialLinks.jsx'

const socialItems = contact.channels.filter((channel) => channel.id !== 'email')

export default function Footer() {
  const reduced = useReducedMotion()
  const year = new Date().getFullYear()

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <p className="footer__line">{footer.authored}</p>
          <p className="footer__signoff">{footer.signoff}</p>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} {site.alias}. All rights reserved.
          </p>

          <SocialLinks items={socialItems} className="footer__social" />

          <p className="footer__stack">{footer.stack}</p>

          <button type="button" className="footer__top-button" onClick={toTop}>
            <span>Back to top</span>
            <LuArrowUp className="footer__top-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}