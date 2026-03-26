import type { Project } from './types'

export type SectionItem = Project[]

export const projects: SectionItem = [
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
    repository: 'https://github.com/mkelvers/resting',
  },
]
