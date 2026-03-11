import { SectionList } from '@/components/section-list'
import { MapPin } from 'lucide-react'

import { projects } from '@/lib/items'
import { LinksSection } from '@/components/links-section'

export default function Home() {
  return (
    <>
      <header className="mb-16 space-y-4">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in text-white">
          <span className="inline-block">mikkel elvers</span>
        </h1>
        <div className="flex flex-col gap-2 text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">Location:</span>
            holbæk, denmark
          </div>
        </div>
        <div className="leading-relaxed max-w-2xl space-y-4">
          <p>
            19 y/o web dev student @ roskilde technical college. writing clean typescript, building
            things, and living in the terminal. when not coding, i&apos;m watching anime.
          </p>
          <p className="text-gray-300">
            currently looking for an internship.{' '}
            <a
              href="mailto:hi.mikkel@outlook.com"
              className="text-white hover:text-accent underline decoration-gray-600 hover:decoration-accent underline-offset-4 transition-colors duration-200"
            >
              let&apos;s talk.
            </a>
          </p>
        </div>
      </header>

      <SectionList
        title="projects"
        items={projects.slice(0, 2)}
        viewAll={{
          href: '/projects',
          label: 'view all projects',
        }}
      />

      <LinksSection />
    </>
  )
}
