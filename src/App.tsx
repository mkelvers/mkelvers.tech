import { Skills } from './components/skills'

export default function App() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-24 space-y-16">
      <section className="max-w-4xl space-y-12">
        <h1 className="text-5xl md:text-7xl lg:text-8xl">
          mikkel elvers
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 lg:gap-16 items-start">
          <div className="text-xl md:text-2xl lg:text-3xl text-neutral-400 leading-tight tracking-tight">
            <p>
              web developer specializing in <span className="text-white">typescript backends</span> and
              modern fullstack frameworks with <span className="text-white">next.js</span> and <span className="text-white">tanstack start</span>.
            </p>
          </div>

          <div className='flex gap-4'>
            <a
              href='https://github.com/mkelvers'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors'
            >
              <img src='/images/github.svg' alt='GitHub' className='size-5 opacity-40 group-hover:opacity-100 transition-opacity duration-300' />
              <span>github</span>
            </a>
            <a
              href='https://www.linkedin.com/in/mikkelnothlev/'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors'
            >
              <img src='/images/linkedin.svg' alt='LinkedIn' className='size-5 opacity-40 group-hover:opacity-100 transition-opacity duration-300' />
              <span>linkedin</span>
            </a>
          </div>

          <div className="text-base md:text-lg text-neutral-500 leading-relaxed border-l border-white/10 lg:pl-8 space-y-4">
            <p>
              i'm a student at <a className='underline text-white' href='https://www.rts.dk/'>roskilde technical school</a> with a focus on writing clean,
              efficient code. I enjoy handling complex tasks independently while being
              a strong communicator in team settings.
            </p>
            <p>
              when i'm not coding, i'm watching anime.
            </p>
          </div>
        </div>
      </section>

      <Skills />
    </main>
  )
}