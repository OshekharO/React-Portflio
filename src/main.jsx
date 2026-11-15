import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import './styles/variables.css'
import './styles/base.css'
import './styles/animations.css'
import './styles/layout.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/toolkit.css'
import './styles/projects.css'
import './styles/education.css'
import './styles/beyond.css'
import './styles/contact.css'

import App from './App.jsx'

// The HTML is prerendered at build time (see scripts/prerender.mjs), so the
// markup is hydrated rather than re-rendered. That keeps the content visible to
// crawlers that do not execute JavaScript, and avoids a flash on load.
hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App />
  </StrictMode>,
)