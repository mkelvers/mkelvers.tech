import { SectionList } from "@/components/section-list";
import { MapPin } from "lucide-react";

import { projects } from "@/lib/items";
import { LinksSection } from "@/components/links-section";

export default function Home() {
  return (
    <>
      <header className="mb-16 space-y-4">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in text-white">
          <span className="inline-block">
            mikkel elvers
          </span>
        </h1>
        <div className="flex flex-col gap-2 text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            holbæk, denmark
          </div>
        </div>
        <div className="leading-relaxed max-w-2xl space-y-4">
          <p>
            i&apos;m a 19 y/o web developer student. i love building things and
            solving problems. i live on the terminal. if i&apos;m not coding, i&apos;m
            probably watching anime or watching a good show.
          </p>
          <p>
            i enjoy writing clean typescript and exploring new web technologies.
          </p>
        </div>
      </header>

      <SectionList
        title="projects"
        items={projects}
        viewAll={{
          href: "/projects",
          label: "view all projects",
        }}
      />

      <LinksSection />
    </>
  )
}
