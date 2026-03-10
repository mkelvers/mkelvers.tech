import { SectionListProps } from "@/components/section-list";
import { ProjectCardProps } from "@/components/project-card";

export type SectionItem = ProjectCardProps[];

export const projects: SectionItem = [
    {
        title: "personal portfolio",
        href: "https://mkelvers.tech",
        role: "personal project",
        period: "2026",
        description: "my personal portfolio built with next.js, tailwindcss and typescript. it features a clean and minimal design with a focus on typography and usability.",
        achievements: [
            "built a responsive personal portfolio",
            "implemented dark mode",
            "optimized for performance"
        ],
        technologies: [
            "next.js",
            "tailwindcss",
            "typescript"
        ]
    }
]