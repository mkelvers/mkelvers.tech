export const skills = [
  { id: 'typescript', name: 'TypeScript' },
  { id: 'react', name: 'React' },
  { id: 'node-js', name: 'Node.js' },
  { id: 'express-js', name: 'Express' },
  { id: 'postgresql', name: 'PostgreSQL' },
  { id: 'better-auth', name: 'Better Auth' },
  { id: 'convex', name: 'Convex' },
  { id: 'sass', name: 'Sass' },
  { id: 'php', name: 'PHP' },
  { id: 'wordpress', name: 'WordPress' },
] as const

export type Project = {
  name: string
  description: string
  techstack: readonly string[]
  github?: string
  live?: string
  images?: readonly string[]
}

export const projects: readonly Project[] = [
  {
    name: 'Resting',
    description:
      'A REST API built with vanilla PHP to deepen my understanding of REST principles, HTTP methods, and API design.',
    techstack: ['PHP', 'MySQL', 'Docker'],
    github: 'https://github.com/mkelvers/resting',
    live: "https://resting-api.mkelvers.tech/",
  },
] as const

export const cv = {
  name: 'Mikkel Nothlev Elvers',
  title: 'Webudvikler',
  location: 'Holbæk, Danmark',
  contact: {
    email: 'hi.mikkel@outlook.com',
    phone: '+45 42 73 63 93',
    linkedin: 'linkedin.com/in/mikkelnothlev',
    github: 'github.com/mkelvers',
    website: 'mkelvers.tech',
  },
  summary:
    'Webudvikler-studerende med fokus på TypeScript, React og moderne backend-teknologier. Selvmotiveret og detaljeorienteret med passion for at skrive ren, vedligeholdelig kode. Søger praktikplads hvor jeg kan anvende mine kompetencer i et professionelt miljø.',
  about:
    'Jeg er en 19 årig udvikler, der har kodet i omkring 2-3 år. Jeg har altid haft en stor passion for teknologi og udvikling, og jeg elsker at lære nye ting. I min fritid bygger jeg ofte små projekter for at udvide mine kompetencer.',
  education: [
    {
      school: 'Roskilde Tekniske Skole',
      degree: 'Webudvikler',
      period: 'Aug 2025 – Okt 2026',
    },
  ],
  skills: [
    'TypeScript',
    'JavaScript',
    'React',
    'Node.js',
    'PHP'
  ],
  projects: [
    {
      name: 'Resting',
      description: 'REST API bygget med PHP, for at bedre forstå REST principper, HTTP metoder og API design. Det var lavet med PHP, Comet (et library for at bygge REST apis), hvor MySQL og PhpMyAdmin blev kørt med Docker',
      tech: ['PHP', 'MySQL', 'Docker'],
      link: 'github.com/mkelvers/resting',
    },
  ],
  languages: [
    { language: 'Dansk', level: 'Modersmål' },
    { language: 'Engelsk', level: 'Flydende' },
  ],
} as const