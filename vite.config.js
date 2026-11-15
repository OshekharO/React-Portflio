import { fileURLToPath, URL } from 'node:url'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// Vite exposes .env values to client code on import.meta.env, not process.env,
// but both plugins below read process.env.VITE_SITE_URL when they are created.
// Loading .env.production here is what lets a plain `npm run build` find the site
// URL; an explicit shell variable still wins.
if (!process.env.VITE_SITE_URL) {
  const { VITE_SITE_URL } = loadEnv('production', rootDir, 'VITE_')
  if (VITE_SITE_URL) process.env.VITE_SITE_URL = VITE_SITE_URL
}

/**
 * Writes dist/sitemap.xml at build time.
 *
 * A sitemap needs absolute URLs, so the file is only emitted when the site URL
 * is known. It comes from .env.production (preferred) or the shell:
 *
 *   VITE_SITE_URL=https://example.com npm run build
 *
 * Without it, the build succeeds and prints what to do. Nothing invalid ships.
 */
function sitemap() {
  const siteUrl = process.env.VITE_SITE_URL
  return {
    name: 'oshekharo-sitemap',
    apply: 'build',
    closeBundle() {
      if (!siteUrl) {
        this.warn(
          '[sitemap] VITE_SITE_URL is not set — skipping dist/sitemap.xml.\n' +
            '[sitemap] Set it at deploy time, e.g. VITE_SITE_URL=https://your-domain.com',
        )
        return
      }
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        `  <url><loc>${siteUrl.replace(/\/$/, '')}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>`,
        '</urlset>',
        '',
      ].join('\n')
      writeFileSync(fileURLToPath(new URL('./dist/sitemap.xml', import.meta.url)), xml, 'utf8')

      // The build also runs for the prerender pass (scripts/prerender.mjs), so
      // the robots.txt edit has to be idempotent rather than appended twice.
      const robotsPath = fileURLToPath(new URL('./dist/robots.txt', import.meta.url))
      let robots = readFileSync(robotsPath, 'utf8')
      const line = `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml`
      if (!robots.includes(line)) {
        writeFileSync(robotsPath, `${robots.replace(/\s*$/, '')}\n\n${line}\n`, 'utf8')
      }

      // public/llms.txt holds the source text with relative links so it stays
      // readable during development. llms.txt consumers expect absolute URLs, so
      // the build rewrites them. Idempotent: already-absolute links do not match.
      const llmsPath = fileURLToPath(new URL('./dist/llms.txt', import.meta.url))
      if (existsSync(llmsPath)) {
        const absolute = readFileSync(llmsPath, 'utf8').replace(
          /\]\(\/(?!\/)/g,
          `](${siteUrl.replace(/\/$/, '')}/`,
        )
        if (absolute !== readFileSync(llmsPath, 'utf8')) {
          writeFileSync(llmsPath, absolute, 'utf8')
        }
      }

      this.info?.('[sitemap] wrote dist/sitemap.xml')
    },
  }
}

/**
 * Canonical URL.
 *
 * A canonical link must be absolute, so the tag is injected at build time from
 * the site URL (.env.production, or VITE_SITE_URL in the shell). Building
 * without it produces a correct site with no canonical tag rather than a
 * canonical pointing at a domain that does not exist.
 */
function seo() {
  const siteUrl = process.env.VITE_SITE_URL
  return {
    name: 'oshekharo-seo',
    transformIndexHtml(html) {
      if (!siteUrl) return html
      const origin = siteUrl.replace(/\/$/, '')
      const url = `${origin}/`
      const imageUrl = `${origin}/og-image.png`

      return html
        .replace(
          '<!-- canonical:site-url -->',
          `<link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />`,
        )
        // Social crawlers require absolute image URLs. Both og:image and
        // twitter:image point at the same file, so replace every occurrence.
        .replaceAll('content="/og-image.png"', `content="${imageUrl}"`)
    },
  }
}

export default defineConfig({
  // No dynamic imports and no code splitting, so the module-preload polyfill is
  // dead weight. Removing it also keeps the HTML free of inline <script>, which
  // lets the CSP in public/_headers stay script-src 'self'.
  build: {
    target: 'es2020',
    modulePreload: { polyfill: false },
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
  plugins: [react(), sitemap(), seo()],
  server: { port: 5173, host: '127.0.0.1' },
  preview: { port: 4173, host: '127.0.0.1' },
})