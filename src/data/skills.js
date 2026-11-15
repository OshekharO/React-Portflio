/**
 * Toolkit content.
 *
 * `icon` values map to a component in components/ui/techIcons.js — data stays
 * free of JSX. `proficiency` percentages are the owner's own assessment and are
 * labelled as such in the UI; they are not a certification or a test score.
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

export const proficiencies = [
  { name: 'Python', value: 90 },
  { name: 'Pandas', value: 85 },
  { name: 'Bootstrap', value: 88 },
  { name: 'Prompt Engineering', value: 82 },
  { name: 'GitHub', value: 92 },
  { name: 'Git', value: 85 },
  { name: 'Java', value: 75 },
  { name: 'Matplotlib', value: 80 },
  { name: 'Node.js', value: 72 },
  { name: 'MySQL', value: 78 },
  { name: 'C#', value: 70 },
]

export const proficiencyNote =
  'Self-assessed levels, not verified proficiency measurements.'