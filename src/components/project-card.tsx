import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export type ProjectCardProps = {
  title: string
  description: string
  role: string
  period?: string
  achievements?: string[]
  technologies: string[]
  href: string
  repository?: string
}

export function ProjectCard(props: ProjectCardProps) {
  const { title, description, role, period, achievements, technologies, href, repository } = props

  return (
    <article className="group border border-accent/10 p-6 transition-colors hover:border-accent/50">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
          {title}
        </h2>

        <div className="flex items-center gap-3">
          {repository && (
            <Link
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              className="group/github"
              aria-label={`GitHub Repository for ${title}`}
            >
              <Image
                src="/icons/github.svg"
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                className="w-5 h-5 opacity-50 transition-all group-hover/github:opacity-100 group-hover/github:scale-110"
              />
            </Link>
          )}
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link"
            aria-label={`Live Site for ${title}`}
          >
            <ArrowUpRight
              aria-hidden="true"
              className="w-5 h-5 text-gray-400 group-hover/link:text-accent transition-all group-hover/link:scale-110 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        {role} {period && `(${period})`}
      </p>

      <p className="text-gray-300 mb-6 max-w-2xl">{description}</p>

      <div className="space-y-6">
        {achievements && (
          <>
            <h3 className="text-white font-semibold mb-2">achievements</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              {achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </>
        )}

        <div>
          <h3 className="text-white font-semibold mb-2">technologies</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 text-sm text-gray-300 bg-accent/20 rounded">
                {tech.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
