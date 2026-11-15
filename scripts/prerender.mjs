/**
 * Build-time prerender.
 *
 * The portfolio is static content, but a client-only React app ships an empty
 * <div id="root">. Search crawlers that execute JavaScript cope with that; most
 * AI answer engines (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) do not,
 * which would make the whole site unreadable to them.
 *
 * This step renders <App /> to HTML with react-dom/server, injects it into
 * dist/index.html, and removes the temporary SSR bundle. The client bundle then
 * hydrates that markup instead of replacing it.
 *
 * Runs automatically after `vite build` via the `postbuild` npm script.
 */
import { build } from 'vite'
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const ssrOutDir = resolve(root, 'dist-ssr')
const htmlPath = resolve(root, 'dist/index.html')

if (!existsSync(htmlPath)) {
  console.warn('[prerender] dist/index.html not found — run `npm run build` first.')
  process.exit(0)
}

await build({
  configFile: resolve(root, 'vite.config.js'),
  root,
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: ssrOutDir,
    emptyOutDir: true,
    minify: false,
  },
})

const { render } = await import(pathToFileURL(resolve(ssrOutDir, 'entry-server.js')).href)
const markup = render()

const html = readFileSync(htmlPath, 'utf8')
const mountPoint = '<div id="root"></div>'

if (!html.includes(mountPoint)) {
  rmSync(ssrOutDir, { recursive: true, force: true })
  throw new Error('[prerender] mount point not found in dist/index.html')
}

writeFileSync(htmlPath, html.replace(mountPoint, `<div id="root">${markup}</div>`), 'utf8')
rmSync(ssrOutDir, { recursive: true, force: true })

const kb = (Buffer.byteLength(markup, 'utf8') / 1024).toFixed(1)
console.log(`[prerender] injected ${kb} kB of prerendered HTML into dist/index.html`)