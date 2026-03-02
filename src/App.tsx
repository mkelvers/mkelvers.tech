import { useState } from 'react'
import { skills, projects, type Project } from '@/lib/data'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type ImageModalState = {
  images: readonly string[]
  index: number
} | null

function ImageModal({
  state,
  on_close,
}: {
  state: ImageModalState
  on_close: () => void
}): React.JSX.Element | null {
  if (!state) return null

  const { images, index } = state
  const [current_index, set_current_index] = useState(index)

  const go_prev = (): void => {
    set_current_index((i) => (i === 0 ? images.length - 1 : i - 1))
  }

  const go_next = (): void => {
    set_current_index((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-4"
      onClick={on_close}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={on_close}
          className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <img
          src={images[current_index]}
          alt={`Screenshot ${current_index + 1}`}
          className="w-full rounded-lg"
        />

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={go_prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous image"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={go_next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next image"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => set_current_index(i)}
                  className={`size-2 rounded-full transition-colors ${
                    i === current_index ? 'bg-accent' : 'bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  on_open_images,
}: {
  project: Project
  on_open_images: (images: readonly string[]) => void
}): React.JSX.Element {
  return (
    <div className="project-card">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="space-y-2">
          <h3 className="font-medium">{project.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          {project.images && project.images.length > 0 && (
            <button
              onClick={() => on_open_images(project.images!)}
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="View screenshots"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="View on GitHub"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="View live site"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.techstack.map((tech) => (
          <span key={tech} className="tech-pill">
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export function App(): React.JSX.Element {
  const [form_status, set_form_status] = useState<FormStatus>('idle')
  const [image_modal, set_image_modal] = useState<ImageModalState>(null)

  const handle_submit = async (e: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    set_form_status('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/mlgwygew', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        set_form_status('success')
        form.reset()
      } else {
        set_form_status('error')
      }
    } catch {
      set_form_status('error')
    }
  }

  const open_images = (images: readonly string[]): void => {
    set_image_modal({ images, index: 0 })
  }

  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Image Modal */}
      <ImageModal state={image_modal} on_close={() => set_image_modal(null)} />

      {/* Hero */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-muted-background rounded-lg p-8 md:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-medium">Mikkel Nothlev Elvers</h1>
              <a
                href="/cv.pdf"
                download
                className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 w-fit"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
            </div>
            <p className="flex items-center gap-2 text-sm italic text-muted-foreground">
              <span className="size-3 rounded-full border-2 border-accent shrink-0" />
              Currently studying at Roskilde Tekniske Skole. (Technical School)
            </p>
            <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
              <p>
                I'm a web development student focused on TypeScript backends and React
                frontends, such as Next or the Tanstack ecosystem. I'm always looking
                for opportunities to collaborate on projects or intern positions where
                I can grow.
              </p>
              <p>
                My hobbies tie closely to my studies - I code in my free time, and
                if I'm not, I'm probably watching anime or listening to some music.
                I'm pretty introverted but easy to talk to once you get me going.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Currently learning: <span className="text-accent">TanStack Start</span>
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="w-full bg-muted-background py-10 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-medium">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-item">
                <img
                  src={`/images/skills/${skill.id}.svg`}
                  alt={skill.name}
                  className="size-5 object-contain"
                />
                <span className="text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-medium">Recent Projects</h2>
            <p className="text-sm text-muted-foreground mt-1">
              A selection of things I've built.
            </p>
          </div>
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                on_open_images={open_images}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer className="mt-auto w-full bg-muted-background py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-medium">Get in touch</h2>
            {form_status === 'success' ? (
              <p className="text-sm text-accent">Thanks! I'll get back to you soon.</p>
            ) : (
              <form onSubmit={handle_submit} className="grid gap-4 max-w-md">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="bg-background border border-border rounded px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  required
                  className="bg-background border border-border rounded px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none"
                />
                <button
                  type="submit"
                  disabled={form_status === 'submitting'}
                  className="bg-accent text-background font-medium rounded px-4 py-2 text-sm hover:bg-accent/90 transition-colors w-fit disabled:opacity-50"
                >
                  {form_status === 'submitting' ? 'Sending...' : 'Send message'}
                </button>
                {form_status === 'error' && (
                  <p className="text-sm text-red-400">Something went wrong. Try again?</p>
                )}
              </form>
            )}
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.github.com/mkelvers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mikkelnothlev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
