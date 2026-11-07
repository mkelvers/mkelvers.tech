import { redirect } from "@sveltejs/kit";
import { profile } from "#lib/profile.ts";
import type { RequestHandler } from "./$types";

// Projects now live on GitHub. Keep old /projects links working.
// SvelteKit 3 refuses external redirects unless the origin is allowlisted.
export const GET: RequestHandler = () =>
  redirect(308, profile.github, { external: ["https://github.com"] });
