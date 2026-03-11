import { ProjectCard } from '@/components/project-card'
import { projects } from '@/lib/items'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <main>
      <Link
        href="/"
        className="text-gray-400 hover:text-accent transition-colors text-sm flex items-center gap-2 mb-8 group w-fit"
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        back
      </Link>

      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent mr-2 font-mono">*</span>
        projects
      </h1>

      <div className="max-w-2xl">
        <p className="text-gray-400 mb-12 leading-relaxed">
          here are some of the projects i&apos;ve worked on. i love building random projects in my
          free time, and i&apos;m always looking for new ideas to work on. if you have any ideas or
          want to collaborate on something, feel free to reach out!
        </p>
      </div>

      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: "Some of the projects I've worked on.",
}
