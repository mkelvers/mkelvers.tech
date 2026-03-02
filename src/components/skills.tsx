const skills = [
  { name: 'TypeScript', src: '/images/typescript.svg' },
  { name: 'React', src: '/images/react.svg' },
  { name: 'Node.js', src: '/images/nodejs.svg' },
  { name: 'PostgreSQL', src: '/images/postgresql.svg' },
  { name: 'PHP', src: '/images/php.svg' },
  { name: 'Sass', src: '/images/sass.svg' },
  { name: 'WordPress', src: '/images/wordpress.svg' },
  { name: 'Better Auth', src: '/images/better-auth.svg' },
]

export function Skills() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl tracking-tight">
        Skills
      </h2>

      <div className="flex flex-wrap gap-12">
        {skills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="group relative flex items-center justify-center shrink-0"
          >
            <img
              src={skill.src}
              alt={skill.name}
              className="w-12 h-12 object-contain opacity-40 hover:opacity-100 transition-opacity duration-300"
            />
            <span className="absolute -top-8 scale-0 group-hover:scale-100 transition-transform bg-neutral-800 text-white text-xs px-2 py-1 rounded border border-white/10 pointer-events-none whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
