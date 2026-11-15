/**
 * Toolkit content.
 *
 * `icon` values map to a component in components/ui/techIcons.js — data stays
 * free of JSX. `level` is the owner's own assessment and is labelled as such in
 * the UI; it is not a certification, a test score, or a measurement. The three
 * levels are deliberately coarse: a percentage invites a reading of measured
 * competence that nothing here supports.
 */

export const skills = {
  index: '02',
  label: 'Toolkit',
  title: 'Things I work with.',
  meta: 'Self-assessed',
}

export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    caption: 'What I write in',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'java' },
      { name: 'C#', icon: 'csharp' },
    ],
  },
  {
    id: 'data',
    label: 'Data & visualization',
    caption: 'Turning data into something readable',
    items: [
      { name: 'Pandas', icon: 'pandas' },
      { name: 'Matplotlib', icon: 'matplotlib' },
    ],
  },
  {
    id: 'web',
    label: 'Web & backend',
    caption: 'Interfaces and the logic behind them',
    items: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Bootstrap', icon: 'bootstrap' },
      { name: 'REST APIs', icon: 'api' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    caption: 'Where the data lives',
    items: [{ name: 'MySQL', icon: 'mysql' }],
  },
  {
    id: 'tools',
    label: 'Development tools',
    caption: 'The everyday kit',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
    ],
  },
  {
    id: 'beyond',
    label: 'Beyond the code',
    caption: 'Capabilities and interests',
    items: [
      { name: 'Prompt Engineering', icon: 'sparkles' },
      { name: 'SEO', icon: 'search' },
      { name: 'Content Writing', icon: 'writing' },
    ],
  },
]

/**
 * Three named levels, in order. `fill` only sets how far the bar draws; it is a
 * relative comparison between rows, not a score.
 */
export const proficiencyLevels = {
  learning: { label: 'Learning', fill: 0.38 },
  working: { label: 'Working', fill: 0.68 },
  comfortable: { label: 'Comfortable', fill: 1 },
}

export const proficiencies = [
  { name: 'Python', level: 'comfortable' },
  { name: 'Pandas', level: 'comfortable' },
  { name: 'Bootstrap', level: 'comfortable' },
  { name: 'Prompt Engineering', level: 'working' },
  { name: 'GitHub', level: 'comfortable' },
  { name: 'Git', level: 'comfortable' },
  { name: 'Java', level: 'working' },
  { name: 'Matplotlib', level: 'working' },
  { name: 'Node.js', level: 'working' },
  { name: 'MySQL', level: 'working' },
  { name: 'C#', level: 'working' },
]

export const proficiencyNote =
  'Self-assessed levels, not verified proficiency measurements.'