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
          bg: "#ffffff",
          fg: "#000000",
          line: "#a3a3a3",
          accent: "#000000",
          muted: "#737373",
          surface: "#fafafa",
          border: "#d4d4d4",
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
