import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// The project list moved into the home page; keep old links working.
export const GET: RequestHandler = () => redirect(308, "/#projects");
