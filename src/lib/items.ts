import { ProjectCardProps } from '@/components/project-card'

export type SectionItem = ProjectCardProps[]

export const projects: SectionItem = [
  {
    title: 'personal portfolio',
    href: 'https://mkelvers.tech',
    role: 'personal project',
    period: '2026',
    description:
      'my personal portfolio built with next.js, tailwindcss and typescript. it features a clean and minimal design with a focus on typography and usability.',
    achievements: [
      'built a responsive personal portfolio',
      'implemented dark mode',
      'optimized for performance',
    ],
    technologies: ['next.js', 'tailwindcss', 'typescript'],
  },
  {
    title: 'resting',
    href: 'https://resting-api.mkelvers.tech',
    role: 'school project',
    period: 'feb 17-27 2026',
    description:
      "vanilla php rest api using gotzmann's comet library. built to understand rest principles, http methods, and api design with mysql and docker.",
    achievements: [
      'implemented rest principles',
      'designed api endpoints',
      'used mysql database',
      'deployed with docker',
    ],
    technologies: ['php', 'mysql', 'docker', 'comet'],
  },
]
