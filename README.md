# OSHEKHARO — portfolio of Saksham Shekher

A single-page personal portfolio and digital identity for **Saksham Shekher** (online identity **OshekharO**): dark editorial layout, oversized display type, monospace metadata, and one restrained lime accent.

Built with React 19 + Vite, plain CSS, and no runtime dependencies beyond React and `react-icons`. Static output, designed to deploy to Cloudflare Pages.

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # vite build → dist/, then the prerender step
npm run preview  # serve the production build
```

The build is two steps. `vite build` emits the bundles, then `postbuild` runs
`scripts/prerender.mjs`, which renders the app to HTML with `react-dom/server`
and injects it into `dist/index.html`. The client bundle hydrates that markup
instead of replacing it, so the page is readable without JavaScript and its
markup is identical either way. `npm run dev` is unaffected: it renders on the
client, as usual.

---

## Contents

- [What is in the box](#what-is-in-the-box)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Design system](#design-system)
- [Accessibility](#accessibility)
- [Deployment on Cloudflare Pages](#deployment-on-cloudflare-pages)
- [Before you deploy](#before-you-deploy)
- [Verified / not verified](#verified--not-verified)

---

## What is in the box

| Area | Notes |
|---|---|
| Sections | Hero, About, Toolkit, Selected Work, Education, Certifications, Personal Side, Contact, Footer |
| Navigation | Sticky header, scroll-progress hairline, active-section tracking, keyboard-accessible mobile overlay menu |
| Content | All copy lives in `src/data/*.js` — edit text without touching components |
| Motion | IntersectionObserver reveals + CSS transitions. No animation library. Full `prefers-reduced-motion` support |
| Accessibility | Semantic landmarks, visible focus, ARIA live region for copy-to-clipboard, 44px touch targets |
| SEO | Title, description, Open Graph, Twitter card, JSON-LD `Person`, `robots.txt`, build-time `sitemap.xml` |
| Crawlers | Page is prerendered to HTML at build time and hydrated on the client, so AI answer engines that do not run JavaScript can read it. `robots.txt` names the AI crawler groups explicitly |
| Deployment | `_headers` (CSP, caching, security headers), `_redirects` (no SPA fallback needed), `dist/` output |

---

## Project structure

```
.
├── index.html                 # metadata, fonts, JSON-LD
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png   # 180×180 home-screen icon (iOS ignores SVG)
│   ├── og-image.png           # 1200×630 social card
│   ├── llms.txt               # summary for AI answer engines
│   ├── robots.txt             # search + AI crawler rules
│   ├── _headers               # Cloudflare Pages headers
│   └── _redirects             # Cloudflare Pages redirects (intentionally empty)
├── scripts/
│   └── prerender.mjs          # renders <App /> to HTML after the build
├── src/
│   ├── main.jsx               # style imports + hydrateRoot
│   ├── entry-server.jsx       # renderToString for the prerender step
│   ├── App.jsx                # section composition
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, Container
│   │   ├── sections/          # Hero, About, Toolkit, Projects, Education,
│   │   │                      # Certifications, BeyondCode, Contact
│   │   └── ui/                # Section, Reveal, Button, ArrowLink, ProjectCard,
│   │                          # ProjectArt, SkillGroup, CopyEmail, SocialLinks,
│   │                          # Emphasis, techIcons
│   ├── data/                  # personal, projects, skills, education,
│   │                          # certifications, beyond
│   ├── hooks/                 # useActiveSection, useInView, useReducedMotion, useScroll
│   └── styles/                # variables, base, animations, layout, hero, about,
│                              # toolkit, projects, education, beyond, contact
├── vite.config.js             # build config + sitemap/canonical plugins
├── PRODUCT.md                 # product definition (source of truth)
└── DESIGN.md                  # design system + desktop/mobile composition
```

---

## Editing content

Everything the page says is in `src/data/`:

| File | Contains |
|---|---|
| `personal.js` | Identity, nav, hero copy, about paragraphs, contact channels |
| `projects.js` | The four projects, their descriptions, tech tags, repository URLs |
| `skills.js` | Capability groups + the self-assessed proficiency list |
| `education.js` | Degree entries |
| `certifications.js` | Credentials and their verification links |
| `beyond.js` | Interests, music, book |

Emphasis inside a paragraph is written with `*asterisks*`; `components/ui/Emphasis.jsx` renders those as highlighted text. Nothing else in the copy needs markup.

Project figures (`components/ui/ProjectArt.jsx`) are CSS/SVG diagrams, not screenshots — the portfolio does not fabricate project imagery. If you add real screenshots later, drop them in `src/assets/images/` and swap the figure for an `<img>` with meaningful `alt`.

---

## Design system

Tokens live in `src/styles/variables.css`; the rationale and both compositions are documented in **`DESIGN.md`**.

- Display: **Space Grotesk** · Body: **Inter** · Mono: **JetBrains Mono** (Google Fonts, `display=swap`, preconnected)
- Ground `#0A0A0A`, surfaces `#111111`/`#181818`, hairlines `#252525`, text `#F2F0EA`, accent `#C5F467`
- Section rhythm `--section-y: clamp(3.25rem, 5.2vw, 5rem)`; container 1240px
- Type scale is fluid (`clamp()`); the hero is the only place that reaches `--step-5`

> **One deliberate deviation from the brief:** muted text is `#85858F`, not `#71717A`. The brief's value measures **4.1:1** on `#0A0A0A`, below the 4.5:1 that small text needs; the lifted value measures **5.4:1** on the page ground and **4.8:1** on elevated surfaces. Everything else in the palette is as specified.

---

## Accessibility

- Semantic landmarks, one `h1`, ordered `h2`/`h3`
- Focus ring: 2px accent, 3px offset, never removed
- No functional text below 11px — nav, tags, cert rows and smallprint all sit on the mono floor
- Mobile menu: `aria-expanded`/`aria-controls`, Escape closes, focus moves in and back out, background scroll locked
- Copy-email result announced via `aria-live="polite"`
- Decorative CSS figures are `aria-hidden`; every external link says "opens in a new tab" for screen readers
- `prefers-reduced-motion: reduce` removes transforms, smooth scrolling, and ambient loops
- Colour is never the only signal (active nav = dot + colour; links carry underlines or arrows)

Verified with an automated contrast sweep of every text node against its effective background (0 failures at AA).

---

## Deployment on Cloudflare Pages

**Dashboard (recommended)**

1. Push the repository to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy. `_headers` and `_redirects` are picked up automatically from `dist/`.

**Wrangler / CLI**

```bash
npm run build
npx wrangler pages deploy dist --project-name oshekharo
```

**Direct upload (drag and drop)**

1. `npm run build`
2. Cloudflare dashboard → **Workers & Pages** → the project → **Create deployment** → upload.
3. Drag the **`dist`** folder. Not `public/` — `public/` holds source assets only (no `index.html`), and Vite copies it into `dist/` during the build.

Every redeploy is a fresh upload, so rebuild before each one.

The project is a static build: no server runtime, no environment variables at runtime, no secrets in the client bundle.

---

## Before you deploy

Two things depend on the final domain:

1. **Canonical URL, absolute social image, sitemap.** These are generated at build time from the site URL, which is read from `.env.production` (committed, already set to `https://saksham.eu.org`). A plain `npm run build` therefore produces them; an explicit shell variable still overrides the file.
   ```bash
   npm run build                                            # uses .env.production
   VITE_SITE_URL=https://your-domain.com npm run build      # overrides it
   ```
   - Without a URL the build still succeeds and prints a warning; the site ships with **no** canonical tag and **no** `sitemap.xml`, which is better than a canonical pointing at a domain you do not own.
   - With it, `dist/sitemap.xml` is written, `<link rel="canonical">`, `og:url`, and absolute `og:image`/`twitter:image` are injected, a `Sitemap:` line is appended to `dist/robots.txt`, and `dist/llms.txt` links become absolute.
   - There is no dashboard equivalent for drag-and-drop deploys: direct upload has no build environment, so the URL has to be present when `npm run build` runs locally.

2. **Social image.** `public/og-image.png` is a designed 1200×630 card. Replace it if you want a photograph or a different composition — keep the filename or update the four `og:image`/`twitter:image` tags in `index.html`.

Also worth doing:

- Point the `CNAME`/custom domain at the Pages project.
- The `Person` JSON-LD in `index.html` lists only verified facts (name, alias, role, GitHub, LinkedIn). Add to it only what you can stand behind.
- `public/llms.txt` is a short plain-text summary aimed at AI answer engines. It is a young convention with no guarantee of being read, so it is written to be useful to a human too — update it if the site's sections change.