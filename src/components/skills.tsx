const skills = [
  { name: 'TypeScript' },
  { name: 'React' },
  { name: 'Node.js' },
  { name: 'PostgreSQL' },
  { name: 'PHP' },
  { name: 'Sass' },
  { name: 'WordPress' },
  { name: 'Better Auth' },
  { name: 'Convex' },
]

export function Skills() {
  return (
    <section className="space-y-8">
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
              src={`/images/${skill.name.toLowerCase().replace(/\s+|\./g, "-")}.svg`}
              alt={skill.name}
              className="size-10 object-contain opacity-40 hover:opacity-100 transition-opacity duration-300"
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
