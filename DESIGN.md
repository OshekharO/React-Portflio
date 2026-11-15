# DESIGN.md — OSHEKHARO

Comp-first record: the visual system and the two intended compositions (desktop spread, mobile column) are fixed here **before** component implementation. The implementation is then verified against rendered screenshots at 1440px and 390px and refined in place.

---

## 1. Concept

**"The Index."** The portfolio is set like a printed technical index: numbered entries, monospace metadata, hairline rules, crosshair registration marks, and one lime marker that means *this is the live thing*. The motif comes from Saksham's own work — a curated directory of sites, CLI diagnostics, README-driven documentation — not from a template.

Three visual registers, used consistently:

| Register | Purpose | Treatment |
|---|---|---|
| Editorial | Identity and story | Oversized Space Grotesk, tight tracking, asymmetric columns, pull quotes |
| Technical | Metadata and labels | JetBrains Mono, uppercase, 0.14em tracking, 11–12px, muted zinc |
| Index | Structure | 1px `#252525` rules, numbered entries `01 → 07`, crosshair `+` marks at intersections |

## 2. Tokens

```css
/* colour */
--bg #0A0A0A        --surface #111111      --elevated #181818
--border #252525    --border-soft #1C1C1C
--text #F2F0EA      --text-2 #A1A1AA       --text-3 #85858F  /* lifted from #71717A: 4.1:1 fails AA */
--accent #C5F467    --accent-2 #A3D957
--accent-dim rgba(197,244,103,.10)   --accent-line rgba(197,244,103,.32)

/* type */
--font-display 'Space Grotesk', system-ui, sans-serif
--font-body    'Inter', system-ui, sans-serif
--font-mono    'JetBrains Mono', ui-monospace, monospace

--step--1 clamp(.78rem, .75rem + .15vw, .86rem)
--step-0  clamp(.95rem, .90rem + .22vw, 1.06rem)
--step-1  clamp(1.10rem, 1.00rem + .45vw, 1.35rem)
--step-2  clamp(1.45rem, 1.20rem + 1.10vw, 2.10rem)
--step-3  clamp(1.95rem, 1.45rem + 2.20vw, 3.10rem)
--step-4  clamp(2.60rem, 1.70rem + 4.20vw, 4.60rem)
--step-5  clamp(3.40rem, 9.20vw, 8.60rem)   /* hero only */

/* mono scale — the floor is 11px */
--mono-1  .6875rem   /* 11px: indices, numerals, tags, meta, smallprint */
--mono-2  .75rem     /* 12px: anything clickable or read as a control */

/* space & layout */
--gutter clamp(1.25rem, 4vw, 3.5rem)
--container 1240px
--section-y clamp(3.25rem, 5.2vw, 5rem)
--header-h 68px

/* motion */
--ease cubic-bezier(.22,1,.36,1)
--dur-1 200ms   --dur-2 520ms   --dur-3 700ms
```

Rules: radii are 2px (4px on large panels); nothing is fully round except status dots and the mobile menu icon hit area. Borders are always 1px and always `--border` unless they are the accent.

**Legibility floor.** Uppercase mono at 0.14em tracking is read, not just seen. Nothing functional renders below 11px — not nav links, not tags, not the "Verify" links, not the smallprint in the terminal panel. Two sizes carry the whole mono register (`--mono-1` passive, `--mono-2` interactive); any value under 11px is a defect, not a scale step. The exception is text *inside* the CSS/SVG project figures, which are pictures of interfaces and `aria-hidden`: their type is drawn, not read.

## 3. Components

| Component | Spec |
|---|---|
| **Button** | Height 46px, padding 0 22px, 13px/0.02em body-medium, radius 2px. Primary: accent fill, `#0A0A0A` text, hover `--accent-2` + arrow 3px right. Ghost: transparent, 1px border, text `#F2F0EA`, hover border `--text-3` + bg `--surface`. Mono arrow glyph, never an emoji. |
| **Section shell** | `<section id aria-labelledby>` with `padding-block: var(--section-y)`, top hairline on all but the first. Header grid: `[num 64px] [title 1fr] [meta auto]`. Num = mono `--mono-1` muted; title = display `--step-3`, tracking -0.03em; meta = mono `--mono-1` uppercase right-aligned, muted. |
| **Project card** | 1px border, `--surface` fill, radius 4px, padding 28px. On ≥1024px the grid is 12 columns: the featured card spans 7 with its neighbour at 5, and the remaining two sit at 6/6. Hover: border `#3A3A3A`, translateY(-3px), visual art shifts 4px. Arrow 16px translates (3px,-3px) on hover. |
| **Tag** | Mono `--mono-1` uppercase 0.1em, 1px border `--border`, padding 4px 8px, radius 2px, `--text-2`. |
| **Skill bar** | 2px track `--border`, fill `--text-2` → accent on reveal. Three named levels — Learning / Working / Comfortable — not percentages: a number implies a measurement nothing here performs. The bar is a relative comparison between rows; the level name carries the meaning. |
| **Cert row** | Grid `[28px index][1fr title/issuer][140px platform][92px action]`, 1px top border, padding 22px 0, hover bg `--surface` and title → accent. |
| **Link (inline)** | Underline 1px `--border`, hover `--accent` with `text-decoration-color` transition. |
| **Nav** | 68px, transparent → `rgba(10,10,10,.72)` + `backdrop-filter: blur(14px)` + bottom hairline after 24px scroll. Links mono `--mono-2` uppercase 0.14em; active = `--text` + 4px lime dot before. CTA is a `.btn`, so it is 46px tall like every other button. |

## 4. Desktop composition (1440)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ OSHEKHARO/dev        HOME ABOUT SKILLS PROJECTS EDUCATION CONTACT   [Let's…] │ 68px, hairline on scroll
├──────────────────────────────────────────────────────────────────────────────┤
│  + grid hairlines (12 col, 3% white)                                          │
│                                                                              │
│  Saksham                              ┌ ~/oshekharo ─────────── ● available │
│  Shekher.                             │ $ whoami                           │
│                                       │ saksham shekher                    │
│  Also known as OshekharO.             │ developer · creator · enthusiast   │
│  DEVELOPER · CREATOR · TECH ENTHUSIAST│ $ cat ./focus                      │
│                                       │ software development               │
│  I'm a developer with a curious mind  │ ai · prompt engineering · oss      │
│  and a creative side. I build         │ $ ▌                                │
│  software, explore emerging tech,     └────────────────────────────────────┘
│  experiment, and keep learning.                        [Explore My Work] [Get in Touch]  GitHub ↗
│  Building things, exploring ideas…
│ ──────────────────────────────────────────────────────────────────────────── │ hairline
│ FOCUS  Software development   │ STACK  Python · Java · C#  │ STATUS  Open…  │ mono meta strip
└──────────────────────────────────────────────────────────────────────────────┘

01 / ABOUT ──────────────────────────────────────────────  (meta: BASED IN INDIA)
│  left rail: heading + metadata list (Location / Focus / Interests)   │  right: prose 60ch
│  "I discovered my real passion lies in writing code, not balance      │  drop cap, accent
│   sheets."  ← pull quote, --step-2 display                            │  highlight phrases
│  PATH:  BCom ──▶ MCA ──▶ Developer        (mono diagram, hairline box) │

02 / TOOLKIT ───────────────────────────────────────────  (meta: SELF-ASSESSED)
│  6 groups in 3×2 bordered blocks: LANGUAGES / DATA & VIS / WEB & BACKEND │
│  DATABASE / TOOLS / BEYOND THE CODE                                       │
│  ── hairline ──   PROFICIENCY (self-assessed, not a certification)       │
│  11 bars in 2 columns, each: name ……… [███████░░░] Comfortable            │
│  Three named levels, never a percentage.                                  │

03 / SELECTED WORK ─────────────────────────────────────  (meta: 04 PROJECTS)
│  ┌ 01 FEATURED (7 cols) ────────────────┐ ┌ 02 (5 cols) ──────────┐ │
│  │  CSS directory art                   │ │  CSS chat art          │ │
│  │  Web-Indexer                         │ │  Cyber-Ai              │ │
│  │  desc · tags · repo ↗                │ │  desc · tags · repo ↗  │ │
│  └──────────────────────────────────────┘ └────────────────────────┘ │
│  ┌ 03 (6 cols) ───────────────────────┐ ┌ 04 (6 cols) ────────────┐ │
│  │  CSS workflow art                   │ │  CSS terminal art        │ │
│  │  Open-Jules                         │ │  PowerShell IT Toolkit   │ │
│  └─────────────────────────────────────┘ └──────────────────────────┘ │
│  7/5 on the first row, 6/6 on the second; the featured project is wider.  │

04 / EDUCATION ─────────────────────────────────────────  (meta: 02 ENTRIES)
│  vertical hairline, square nodes; two entries: degree, institution, desc, mono tag

05 / CERTIFICATIONS ────────────────────────────────────  (meta: 04 VERIFIED)
│  index │ title / issuer │ platform │ verify ↗     (4 hairline rows)

06 / PERSONAL SIDE ─────────────────────────────────────  (meta: OFF THE CLOCK)
│  intro paragraph (2 cols) │ interests numbered list │ music panel (waveform)
│  book panel: CSS typographic spine + title/author/description

07 / GET IN TOUCH ──────────────────────────────────────  (meta: NO FORMS, JUST EMAIL)
│  Have an idea? / Let's build something.   │  channels list: EMAIL/GITHUB/LINKEDIN
│  me@saksham.eu.org [copy]                 │  each row: icon, label, handle, ↗

┌ footer ────────────────────────────────────────────────────────────────────┐
│ Designed & built by Saksham Shekher │ socials │ © 2026 OshekharO │ ↑ top    │
└────────────────────────────────────────────────────────────────────────────┘
```

## 5. Mobile composition (390)

Design intent: **a reading column with an index spine.** The desktop's asymmetry becomes vertical rhythm; the left metadata rail becomes a compact label row above each heading.

```
┌──────────────────────────┐
│ OSHEKHARO/dev      [≡]   │ 60px, hairline on scroll
├──────────────────────────┤
│ Saksham                  │ hero clamp → 3.4rem, lh .92
│ Shekher.                 │
│ Also known as OshekharO. │
│ DEVELOPER · CREATOR ·    │ wraps to 2 lines, 11px
│ TECH ENTHUSIAST          │
│                          │
│ I'm a developer with a   │ 15.5px/1.65
│ curious mind…            │
│                          │
│ [ Explore My Work      ] │ full width 48px
│ [ Get in Touch         ] │ full width 48px
│ GitHub ↗                 │ text link, 44px tap
│ ┌ ~/oshekharo ─────────┐ │
│ │ $ whoami             │ │ 11px mono, 16px padding
│ │ saksham shekher      │ │
│ │ $ ▌                  │ │
│ └──────────────────────┘ │
│ FOCUS / STACK / STATUS   │ stacked mono rows, hairlines
└──────────────────────────┘

01 / ABOUT                 │ num + title on one line, meta below
A little about me.
prose 1 col, pull quote, path diagram (wraps to 2 lines)
metadata rows: LOCATION / FOCUS / INTERESTS

02 / TOOLKIT → 6 blocks, 1 col (2 col ≥ 480px)
   proficiency bars 1 col

03 / WORK → 4 cards, 1 col, art on top (16:9), content below
   (no hover-only cues; arrow always visible)

04 / EDUCATION → timeline, node + content, single column
05 / CERTIFICATIONS → stacked: index + title, issuer, platform, verify
06 / PERSONAL SIDE → intro, interests list, music, book (stacked)
07 / CONTACT → heading, email (break-all), copy, channels stacked

footer: 3 stacked rows, back-to-top full-width ghost button
```

## 6. Motion specification

| Moment | Behaviour |
|---|---|
| Hero entrance | Staggered: name lines (0/90ms) → identity (180) → descriptor (240) → copy (320) → CTAs (400) → panel (440) → tagline (480) → facts (560+). 12px rise, opacity 0→1, 700ms `--ease`. |
| Section reveal | `translateY(18px)` + opacity, 520ms, fires once at 12% visibility. Children stagger 60ms. |
| Project cards | 70ms stagger, 3px rise only (less than body copy). |
| Skill bars | Width 0→value over 900ms, 80ms stagger, only when in view. |
| Nav | Background/border transition 200ms; active dot scale 0→1. |
| Hover | ≤200ms: border colour, background, 3px translate, 3px arrow shift. |
| Ambient | Caret blink 1.1s steps; status dot pulse 2.4s. Both stop under reduced motion. |
| Reduced motion | All transforms → none; opacity-only 1ms; smooth scroll → auto; ambient loops → static. |

## 7. What this design deliberately avoids

Glassmorphism, neon glow, aurora gradients, emoji, floating blobs, equal-height card grids repeated eight times, stock photography, fake dashboards, circular progress rings, and a light-mode toggle that would dilute the dark identity.