import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)