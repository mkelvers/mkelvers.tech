import { SectionListProps } from "@/components/section-list";

export type SectionItem = SectionListProps['items'];

export const projects: SectionItem = [
    {
        title: "personal portfolio",
        href: "https://mkelvers.tech",
        role: "personal project",
        period: "2026",
        description: "my personal portfolio built with next.js, tailwindcss and typescript. it features a clean and minimal design with a focus on typography and usability.",
    }
]