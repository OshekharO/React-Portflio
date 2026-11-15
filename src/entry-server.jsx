import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/**
 * Server entry used only by the prerender step (scripts/prerender.mjs).
 * Everything here is safe to run without a DOM: no component touches `window`
 * during render, only in effects.
 */
export function render() {
  return renderToString(<App />)
}

export default render