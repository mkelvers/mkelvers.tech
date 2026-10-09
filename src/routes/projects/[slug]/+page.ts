import { error } from "@sveltejs/kit";
import { projects } from "#lib/projects.ts";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params, data }) => {
  const project = projects.find((project) => project.slug === params.slug);

  if (!project) {
    error(404, "Project not found");
  }

  return { ...data, project };
};
