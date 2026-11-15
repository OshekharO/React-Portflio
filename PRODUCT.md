# PRODUCT.md — OSHEKHARO

> Product definition for the personal portfolio of **Saksham Shekher** (online identity **OshekharO**).
> This document is the source of truth for design and implementation decisions.
> Legend: **[C]** = confirmed by the project brief / verified from a primary source. **[A]** = design assumption made by the implementer, safe to change.

---

## 1. Product overview

A single-page personal portfolio and digital identity for a developer. It presents who Saksham is, what he builds, what he works with, how he learned, and how to reach him. It is a *personal site*, not a product marketing site: there is no funnel, no signup, no pricing, and no client acquisition machinery.

The site is built as an **editorial index**: numbered entries, monospace metadata, hairline rules, asymmetric compositions, and one restrained accent colour. The "index" motif is drawn from Saksham's own work (a curated web directory, CLI tooling, technical documentation) rather than from a generic template.

- **Format:** one page, ten anchored sections, no client-side routes.
- **Platform:** static React SPA, deployed to Cloudflare Pages.
- **Tone:** precise, curious, quietly confident. No hype, no "10x", no growth-hack language.

## 2. Product purpose

1. Answer "who is this person and what do they do?" within five seconds.
2. Provide verifiable evidence of ability: real repositories, real certificates with verification links.
3. Give a technical visitor (recruiter, engineer, collaborator) enough signal to decide whether to make contact.
4. Be a pleasure to read and to use on any device, including with a keyboard and a screen reader.

## 3. Target audience

| Audience | What they need | What we must not do |
|---|---|---|
| Technical recruiters / hiring managers | Role-relevant stack, evidence of real work, a fast read | Invent employment history, pad with fake metrics |
| Engineers & potential collaborators | Depth: what was built, with what, and why | Describe projects vaguely or inaccurately |
| Open-source maintainers / community | A clear way to reach out, GitHub-first | Hide the GitHub profile behind a form |
| Peer developers / students | A relatable path (commerce → computer applications) and honest self-assessment | Overstate skill percentages as certification |

## 4. Primary user needs

- Understand the person's identity and positioning in one screen.
- Scan the technology surface quickly.
- Judge project quality from real links and specific descriptions.
- Verify credentials independently.
- Contact via a real channel (email, GitHub, LinkedIn) without friction.
- Read comfortably on a phone, one-handed.

## 5. Website goals

- **Clarity:** every section answers one question.
- **Credibility:** every claim is either verifiable or clearly labelled as self-assessed.
- **Distinctiveness:** the visual language is specific and recognisable, not a template.
- **Performance:** fast first paint, no layout shift, minimal JavaScript.
- **Accessibility:** WCAG 2.2 AA as a working baseline.
- **Deployability:** static build, zero backend, Cloudflare Pages native.

## 6. Personal brand positioning

A developer with an unconventional academic route — **BCom at Patliputra University → MCA at Ganpat University** — who discovered that the part of the work he actually loves is writing code.

He works across **Python, Java, and C#**, builds practical tools (a large curated web index, a cybersecurity assistant, an agentic GitHub workflow runner, a cross-platform sysadmin toolkit), and is currently exploring **prompt engineering** and AI-assisted development.

Positioning statement (internal, not shipped as a slogan):
> *A curious generalist who ships real tools, documents them honestly, and learns in public.*

## 7. Brand personality

| Trait | Expression on the site |
|---|---|
| Curious | "Exploring" appears as an ongoing state, not a finished claim |
| Experimental | Multiple languages and stacks, side projects, self-directed learning |
| Precise | Monospace metadata, numbered sections, hairline rules, exact labels |
| Honest | Self-assessed skills are labelled as self-assessed; no invented dates |
| Warm | First-person voice, personal side section, no corporate stiffness |

## 8. Content strategy

- **Voice:** first person, plain, specific. Short sentences. No exclamation marks except the hero eyebrow.
- **Hierarchy:** one idea per block, one action per section.
- **Evidence over adjectives:** links to repositories and certificates instead of claims.
- **No invented facts:** if a fact is not in the brief or verifiable from a primary source, it is omitted — not guessed.
- **Content lives in `src/data/*.js`**, separate from presentation, so copy can be edited without touching components.

## 9. Information architecture

```
/  (single page)
├── #home          Navigation + Hero
├── #about         01 / About
├── #toolkit       02 / Toolkit (skills grouped + self-assessed levels)
├── #projects      03 / Selected Work (4 projects)
├── #education     04 / Education
├── #certifications 05 / Certifications
├── #beyond        06 / Personal Side
├── #contact       07 / Get in touch
└── footer
```

Reading order matches the narrative: identity → person → capability → proof of work → learning → credentials → personality → invitation.

## 10. Website sections

1. **Navigation** — brand, six anchors, a "Get in Touch" CTA, mobile overlay menu, active-section tracking.
2. **Hero** — name, alias, descriptor, positioning paragraph, two CTAs, GitHub link, developer metadata panel.
3. **About** — editorial prose, pull quote, commerce → code path diagram, metadata (location, focus, interests).
4. **Toolkit** — six capability groups with icons, plus eleven self-assessed proficiency indicators.
5. **Selected Work** — four projects; one featured, one secondary emphasis, two balanced.
6. **Education** — two entries on a hairline timeline; the academic transition is part of the story.
7. **Certifications** — four verifiable credentials in an editorial list.
8. **Personal Side** — interests, music, one book. Magazine-inspired, typography-led.
9. **Contact** — email with copy interaction, GitHub, LinkedIn.
10. **Footer** — authorship, year, socials, back-to-top, build detail.

## 11. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| F1 | Sticky header, transparent at rest, solid + hairline after scroll | Must |
| F2 | Smooth anchor scrolling with header offset | Must |
| F3 | Active section reflected in navigation | Must |
| F4 | Mobile menu: open/close, Escape to close, focus management, scroll lock | Must |
| F5 | Copy-email button with `aria-live` confirmation | Must |
| F6 | All external links: `target="_blank"` + `rel="noopener noreferrer"` + accessible "opens in new tab" hint | Must |
| F7 | Scroll-reveal animations via IntersectionObserver, fire once | Must |
| F8 | `prefers-reduced-motion` disables transforms/loops | Must |
| F9 | Scroll progress indicator | Nice |
| F10 | Back-to-top control | Nice |
| F11 | No contact form (no backend exists) | Must (constraint) |

## 12. Visual design direction

**A dark editorial index.** Think: a well-set technical journal or a design studio's printed portfolio, rendered for the browser. Hairline rules instead of cards-within-cards. Oversized display type as the primary image. Colour used as a marker, not a wash.

- **Palette:** near-black ground (`#0A0A0A`), elevated charcoal surfaces, warm off-white text, zinc secondary text, **lime `#C5F467` used only for markers, active state, primary action, and one or two focal details**.
- **Type:** Space Grotesk for display (tight tracking, large scale), Inter for body, JetBrains Mono for metadata, section numbers, and technical labels. All sizes fluid with `clamp()`.
- **Space:** a 4px base scale; section rhythm set by `clamp()` so mobile tightens and desktop opens up. Generous but not empty.
- **Layout:** 12-column desktop grid inside a 1240px container; a persistent hairline rhythm; asymmetric section compositions (7/5, 5/7, 6/6) rather than repeated equal cards.
- **Surface:** flat charcoal panels with 1px borders and 2–4px radii. No glassmorphism, no neon glow, no random gradients, no floating blobs.
- **Decoration:** corner crosshair marks, small monospace figure labels (`FIG. 01`), thin rules, CSS-generated technical diagrams. Every decorative element is either meaningful or removed.
- **Motion:** entrance reveals of 12–20px with opacity, 500–700ms, cubic-bezier(0.22, 1, 0.36, 1); staggered children; hover transitions ≤200ms on border/background/transform. Nothing loops except a single caret blink and a status dot pulse.

### Design principles

1. **Type does the heavy lifting.** If a section looks empty, fix the type scale before adding an ornament.
2. **One accent, used sparingly.** Lime marks *this* — the current thing, the primary action, the live detail.
3. **Structure over decoration.** Rules, numbers, and alignment create the visual system.
4. **Two designed versions, not one shrunk version.** Desktop is a spread; mobile is a single column with its own rhythm.
5. **Real content only.** No lorem ipsum, no stock photography, no invented screenshots.
6. **Fast by construction.** No animation library, no icon font, no image carousel.

## 13. Design tokens (implemented in `src/styles/variables.css`)

```
Colour     bg #0A0A0A · surface #111111 · elevated #181818 · border #252525
           text #F2F0EA · text-2 #A1A1AA · text-3 #85858F (lifted from the brief's #71717A to pass 4.5:1)
           accent #C5F467 · accent-2 #A3D957
Type       display 'Space Grotesk' · body 'Inter' · mono 'JetBrains Mono'
Scale      --step--1 … --step-5 (clamp)
Mono       --mono-1 .6875rem (11px, passive) · --mono-2 .75rem (12px, interactive)
Space      4px base; literal rem per component (no scale tokens)
Layout     --container 1240px · --gutter clamp(1.25rem, 4vw, 3.5rem)
Radius     --radius 2px · --radius-lg 4px
Motion     --ease  cubic-bezier(.22,1,.36,1) · --dur-1 200ms · --dur-2 520ms
```

Nothing functional renders below 11px. Uppercase mono at wide tracking has to be
read, not just seen, so the mono register has two sizes and a hard floor; a
smaller value is a defect rather than a scale step.

## 14. Responsive behaviour

| Range | Composition |
|---|---|
| 320–374 | Single column, 20px gutters, hero type clamps to 3.5rem, terminal panel drops to 11px mono, stacked CTAs |
| 375–767 | Single column, 24px gutters, full-width primary CTA, project cards stack visual-over-content, certifications stack to title/meta |
| 768–1023 | Two-column where it helps (about, toolkit 2-up, projects 2-up), 32px gutters, nav still collapses to overlay |
| 1024–1439 | Full editorial spread: 12-col grid, asymmetric project composition, sticky about rail |
| ≥1440 | Container capped at 1240px, type reaches max of its clamp, whitespace increases |

Rules: no horizontal overflow at any width; no hover-only affordances; 44px minimum touch targets; reading text never below 15px, labels and meta never below 11px.

## 15. Accessibility expectations

- Semantic landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`.
- One `h1`; sections use `h2`; cards and sub-blocks use `h3` in order.
- Visible focus ring: 2px accent outline with 2px offset, never removed.
- Skip-to-content link as the first focusable element.
- Mobile menu: `aria-expanded`, `aria-controls`, Escape closes, focus moves into the panel and returns to the trigger, background scroll locked.
- Copy-email confirmation announced through `aria-live="polite"`.
- Decorative CSS art and crosshairs: `aria-hidden="true"`.
- Colour is never the only signal (active nav also gets weight/underline; links are underlined or carry an arrow + label).
- Contrast: body text `#F2F0EA` on `#0A0A0A` ≈ 17:1; secondary `#A1A1AA` ≈ 8.9:1; muted `#85858F` ≈ 5.4:1 on `#0A0A0A` and ≈ 4.8:1 on `#181818` (the brief's `#71717A` measured 4.1:1, which fails AA for small text). Accent on background ≈ 15:1; black on accent ≈ 15:1.
- `prefers-reduced-motion: reduce` removes transforms, disables smooth scroll and the caret/dot loops, and shows all content immediately.

## 16. Performance requirements

- Target Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
- Runtime dependencies limited to `react`, `react-dom`, `react-icons`.
- No animation or UI framework; reveals are one `IntersectionObserver` plus CSS.
- Fonts: two families actually needed for display/body plus one mono, loaded from Google Fonts with `preconnect` and `display=swap`; system fallbacks declared.
- Zero raster images in the critical path; all visuals are CSS/SVG.
- No layout shift: font metrics fallback, fixed aspect-ratio panels, no late-injected content.
- Single JS bundle; no code splitting needed at this size.

## 17. SEO requirements

- Title: *Saksham Shekher (OshekharO) | Developer & Creator*
- Meta description, canonical, Open Graph (title, description, type, image, site name), Twitter card, theme-color, favicon.
- `robots.txt`, `sitemap.xml`.
- Semantic headings, descriptive link text, `lang="en"`.
- No fabricated structured data, ratings, or employment claims.
- Canonical URL is **configurable**: it is injected at build time from `VITE_SITE_URL`. Building without that variable produces a correct site with no canonical tag rather than one pointing at a domain that does not exist. **[A]**

## 18. Technical stack

| Layer | Choice | Why |
|---|---|---|
| Build | Vite 7 | Static output, instant dev, native CSS modules |
| UI | React 19, function components, hooks only | Required by brief; no class components |
| Language | JavaScript / JSX | Brief default; no type complexity to justify TS |
| Styling | Organized global CSS (tokens → base → sections) + one `animations.css` | Shared section shells; avoids duplicating layout primitives across 8 modules |
| Icons | `react-icons` (Simple Icons for tech, Feather/Lucide for UI) | Tree-shaken, no icon font, consistent sizing |
| Motion | `IntersectionObserver` + CSS transitions | Smallest possible footprint; full reduced-motion control |
| Hosting | Cloudflare Pages, `dist/` output | Brief requirement; no server runtime |
| Data | `src/data/*.js` | Content separated from presentation |

## 19. Cloudflare Pages deployment requirements

- Build command `npm run build`, output directory `dist`.
- `public/_headers` — caching for `/assets/*` (immutable, hashed) and security headers (CSP allowing Google Fonts, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`).
- `public/_redirects` — SPA fallback not required (single page, no client routes); file present and documented as a no-op safeguard.
- No `wrangler.toml` needed for a static Pages project; documented in README.
- All asset URLs root-relative (`/favicon.svg`), so the site works under a custom domain path-less deployment.

## 20. Constraints and non-goals

**Constraints**

- Do not invent employment, clients, dates, scores, credential IDs, or project features.
- Do not include "Uncoder" or "OneIndia" anywhere. **[C]**
- No founder/startup/business positioning. **[C]**
- No contact form without a real backend.
- No copyrighted music, lyrics, or book cover artwork.
- No profile photograph exists; do not fabricate one.

**Non-goals**

- Multi-page routing, blog/CMS, dark/light theme toggle (the brand is dark-first).
- Analytics, tag managers, cookie banners.
- Backend services, databases, or serverless functions.

## 21. Success criteria

1. A first-time visitor can state what Saksham does and how to contact him after one scroll.
2. Every claim on the page is verifiable or explicitly labelled as self-assessed.
3. The page is fully usable at 320px and at 1920px, by keyboard, and with reduced motion.
4. Production build succeeds; no console errors; no horizontal overflow.
5. Lighthouse targets met (measured, not asserted).
6. The visual language is specific enough that a screenshot is identifiable as this site and not a template.

## 22. Open items / missing information

| Item | Status |
|---|---|
| Production domain | Unknown — canonical + sitemap come from `VITE_SITE_URL` at build time |
| OG image raster | Generated locally from a designed template (1200×630 PNG) |
| Project screenshots | None exist and none are fabricated; projects use CSS-generated diagrams |
| Skill percentages | Self-assessed, labelled as such on the page |
| Education dates / scores | Not supplied, therefore not shown |
| Certificate completion dates / IDs | Not supplied, therefore not shown |