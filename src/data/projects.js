/**
 * Project content.
 *
 * Descriptions are written from each repository's own README (read at build
 * time, not invented). No stars, download counts, or performance numbers are
 * quoted because they change. `art` selects a CSS-generated figure, so the
 * portfolio ships without screenshots that do not exist.
 */

export const projects = [
  {
    id: 'web-indexer',
    index: '01',
    name: 'Web-Indexer',
    tagline: 'One destination for the web’s scattered corners.',
    description:
      'A curated directory of websites and apps for manga, light novels, movies, anime, learning resources, and useful tools. Search with a keyboard shortcut, filter by category, bookmark favourites, and see which sites are currently reachable. The whole catalogue is a single JSON file, and a GitHub Actions pipeline turns community site suggestions into pull requests.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'JSON', 'GitHub Actions'],
    repo: 'https://github.com/OshekharO/Web-Indexer',
    live: 'https://indexer.moe.page',
    art: 'directory',
    featured: true,
    note: 'Open source · Unlicense',
  },
  {
    id: 'cyber-ai',
    index: '02',
    name: 'Cyber-Ai',
    tagline: 'An AI assistant for threat analysis, CTFs, and secure coding.',
    description:
      'A cybersecurity chat workspace: streaming answers with Markdown and code highlighting, multiple persisted sessions, message search, export, and feedback on each response. Supabase handles authentication and a role-based admin dashboard manages users.',
    tech: ['React', 'TypeScript', 'Vite', 'Supabase'],
    repo: 'https://github.com/OshekharO/Cyber-Ai',
    live: null,
    art: 'chat',
    featured: false,
    note: 'React 19 · Supabase',
  },
  {
    id: 'open-jules',
    index: '03',
    name: 'Open-Jules',
    tagline: 'Gemini CLI, running on your repos from the browser.',
    description:
      'A Cloudflare Pages app that drives Gemini CLI against a GitHub repository through GitHub Actions. It installs the workflow, seals your API key as an encrypted repository secret, dispatches a run, and polls it to completion — no database, and no server-side credential storage.',
    tech: ['React', 'Vite', 'Cloudflare Pages', 'GitHub Actions', 'tweetnacl'],
    repo: 'https://github.com/OshekharO/Open-Jules',
    live: 'https://jules-web.pages.dev',
    art: 'workflow',
    featured: false,
    note: 'Serverless · Zero-DB',
  },
  {
    id: 'sysadmin-toolkit',
    index: '04',
    name: 'PowerShell IT Toolkit',
    tagline: 'Diagnose. Repair. Keep systems running.',
    description:
      'An all-in-one diagnostic and repair toolkit for Windows and Linux: hardware and disk health, driver and crash-dump analysis, network and SMB audits, event logs, package repair, and consolidated reports — all from one interactive menu.',
    tech: ['PowerShell', 'Bash', 'Windows', 'Linux', 'MIT'],
    repo: 'https://github.com/OshekharO/PowerShell-IT-Toolkit',
    live: null,
    art: 'terminal',
    featured: false,
    note: 'Sysadmin · Cross-platform',
  },
]

export const projectsMeta = {
  index: '03',
  label: 'Selected work',
  title: "Things I've built.",
  meta: '04 projects',
  body: 'A collection of experiments, tools, and projects built while exploring software development and solving practical problems.',
}