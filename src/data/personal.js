/**
 * Single source of truth for identity, copy, and contact details.
 * Everything here is either supplied by the brief or verified from a primary
 * source (repository READMEs, certificate verification pages).
 */

export const site = {
  name: 'Saksham Shekher',
  brand: 'OSHEKHARO',
  alias: 'OshekharO',
  descriptor: 'Developer · Creator · Tech Enthusiast',
  tagline: 'Building things, exploring ideas, and learning along the way.',
}

/* Page order, not alphabetical or importance order: the sections run
   About → Toolkit → Selected Work, so the links do too. */
export const nav = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const hero = {
  nameLines: ['Saksham', 'Shekher.'],
  aliasLine: 'Also known as OshekharO.',
  description:
    "I'm a developer with a curious mind and a creative side. I build software, explore emerging technologies, experiment with ideas, and continuously learn through creating.",
  primaryCta: { label: 'Explore My Work', href: '#projects' },
  secondaryCta: { label: 'Get in Touch', href: '#contact' },
}

/** Developer metadata shown in the hero panel. Kept factual and current. */
export const heroMeta = {
  path: '~/oshekharo',
  status: 'available',
  location: 'India',
  focus: 'Software development',
  stack: 'Python · Java · C#',
  current: 'Prompt engineering & AI workflows',
  commands: [
    { prompt: 'whoami', output: ['saksham shekher'] },
    { prompt: 'cat ./focus', output: ['software development'] },
    { prompt: 'ls ./interests', output: ['ai · open source · writing'] },
  ],
}

export const about = {
  index: '01',
  label: 'About',
  title: 'A little about me.',
  meta: 'Based in India',
  // *text* marks a phrase the design emphasises. Rendered by <Emphasis>.
  paragraphs: [
    "I'm Saksham Shekher, a developer with an unconventional path — from a BCom at Patliputra University to pursuing an MCA at Ganpat University, I discovered my real passion lies in *writing code, not balance sheets*.",
    'I work primarily with Python, Java, and C#, building everything from web indexers and REST APIs to data visualization pipelines with Pandas and Matplotlib. I’m equally comfortable styling interfaces with Bootstrap and shipping serverless logic on Cloudflare Workers.',
    "Lately, I've been exploring *Prompt Engineering* and how AI can accelerate developer workflows.",
    'I believe in *clean code*, *honest documentation*, and *learning in public* through open source.',
  ],
  pullStatement: 'I believe in clean code, honest documentation, and learning in public through open source.',
  path: [
    { label: 'BCom', detail: 'Patliputra University' },
    { label: 'MCA', detail: 'Ganpat University' },
    { label: 'Developer', detail: 'Writing code, not balance sheets' },
  ],
  facts: [
    { label: 'Location', value: 'India' },
    { label: 'Focus', value: 'Software Development' },
    { label: 'Interests', value: 'Technology, AI, Open Source, Writing' },
  ],
}

export const contact = {
  index: '07',
  label: 'Get in touch',
  title: 'Have an idea?',
  titleAccent: "Let's build something.",
  body: "Whether it's an interesting project, a technical discussion, an open-source collaboration, or simply exchanging ideas, I'd love to hear from you.",
  email: 'me@saksham.eu.org',
  channels: [
    {
      id: 'email',
      label: 'Email',
      value: 'me@saksham.eu.org',
      href: 'mailto:me@saksham.eu.org',
      icon: 'mail',
      external: false,
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'github.com/OshekharO',
      href: 'https://github.com/OshekharO/',
      icon: 'github',
      external: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'in/oshekher',
      href: 'https://www.linkedin.com/in/oshekher/',
      icon: 'linkedin',
      external: true,
    },
  ],
}

export const footer = {
  authored: 'Designed & built by Saksham Shekher.',
  signoff: 'Built with curiosity and a little bit of caffeine.',
  stack: 'React · Vite · Cloudflare Pages',
}