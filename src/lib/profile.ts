export const profile = {
  name: "Mikkel Elvers",
  fullName: "Mikkel Nothlev Elvers",
  email: "mikkelelvers@outlook.com",
  phone: "+45 42 73 63 93",
  github: "https://github.com/mkelvers",
  linkedin: "https://www.linkedin.com/in/mikkelnothlev/",
} as const;

export const stack = [
  {
    icon: "typescript",
    label: "TypeScript",
  },
  {
    icon: "react",
    label: "React",
  },
  {
    icon: "svelte",
    label: "SvelteKit",
  },
  {
    icon: "tailwindcss",
    label: "Tailwind CSS",
  },
  {
    icon: "postgresql",
    label: "PostgreSQL",
  },
  {
    icon: "docker",
    label: "Docker",
  },
] as const;

export const skillGroups = [
  {
    key: "frontend",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "SvelteKit",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    key: "backend",
    items: ["Express", "Hono", "Bun", "REST APIs", "PostgreSQL", "SQLite", "Zod"],
  },
  {
    key: "tools",
    items: ["Docker", "Git", "Testing"],
  },
] as const;
