import { Skills } from './components/skills'

export default function App() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-24 space-y-16">
      <section className="max-w-4xl space-y-12">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
          Mikkel Elvers
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 lg:gap-16 items-start">
          <div className="text-xl md:text-2xl lg:text-3xl text-neutral-400 leading-tight tracking-tight">
            <p>
              Web developer specializing in <span className="text-white">TypeScript backends</span> and
              modern fullstack frameworks with <span className="text-white">Next.js</span> and <span className="text-white">TanStack Start</span>.
            </p>
          </div>

          <div className="text-base md:text-lg text-neutral-500 leading-relaxed border-l border-white/10 lg:pl-8 space-y-4">
            <p>
              I'm a student at Roskilde Technical College with a focus on writing clean,
              efficient code. I enjoy handling complex tasks independently while being
              a strong communicator in team settings.
            </p>
            <p>
              When I'm not coding, I'm usually exploring new technologies or
              working on personal hobby projects.
            </p>
          </div>
        </div>
      </section>

      <Skills />
    </main>
  )
}