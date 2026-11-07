import { projects } from "#lib/projects.ts";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ url }) => {
  const paths = [
    "/",
    ...projects.map((project) => `/projects/${project.slug}`),
    "/cv",
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((path) => `  <url><loc>${url.origin}${path}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
