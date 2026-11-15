import { fileURLToPath, URL } from 'node:url'
import { writeFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

/**
 * Writes dist/sitemap.xml at build time.
 *
 * A sitemap needs absolute URLs, and the production domain is not fixed yet,
 * so the file is only emitted when VITE_SITE_URL is provided:
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
      this.info?.('[sitemap] wrote dist/sitemap.xml')
    },
  }
}

/**
 * Canonical URL.
 *
 * A canonical link must be absolute, and the production domain is not fixed
 * yet, so the tag is injected at build time from VITE_SITE_URL. Building
 * without it produces a correct site with no canonical tag rather than a
 * canonical pointing at a domain that does not exist.
 */
function seo() {
  const siteUrl = process.env.VITE_SITE_URL
  return {
    name: 'oshekharo-seo',
    transformIndexHtml(html) {
      if (!siteUrl) return html
      const url = `${siteUrl.replace(/\/$/, '')}/`
      return html
        .replace(
          '<!-- canonical:site-url -->',
          `<link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />`,
        )
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