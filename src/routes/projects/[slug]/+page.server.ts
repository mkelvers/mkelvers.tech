import { renderMermaidSVG } from "beautiful-mermaid";
import { t } from "#lib/i18n.ts";
import type { PageServerLoad } from "./$types";

const sources = import.meta.glob<string>("/src/content/diagrams/*.mmd", {
  query: "?raw",
  import: "default",
  eager: true,
});

// beautiful-mermaid adds a Google Fonts @import to every SVG; the font is self-hosted
export const load: PageServerLoad = ({ locals }) => {
  const labels = t("diagram", {
    lang: locals.lang,
  });

  const diagrams = Object.fromEntries(
    Object.entries(sources).map(([path, source]) => [
      path.split("/").pop()!.replace(".mmd", ""),
      renderMermaidSVG(
        source.replace(
          /\{\{(\w+)\}\}/g,
          (_, key: string) => labels[key as keyof typeof labels],
        ),
        {
          bg: "light-dark(#ffffff, #000000)",
          fg: "light-dark(#000000, #ffffff)",
          line: "light-dark(#a3a3a3, #737373)",
          accent: "light-dark(#000000, #ffffff)",
          muted: "light-dark(#737373, #a3a3a3)",
          surface: "light-dark(#fafafa, #171717)",
          border: "light-dark(#d4d4d4, #404040)",
          font: "Inter Variable",
          transparent: true,
        },
      ).replace(/@import url\([^)]*\);/g, ""),
    ]),
  );

  return {
    diagrams,
  };
};
