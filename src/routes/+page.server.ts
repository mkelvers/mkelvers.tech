import { SORA_API_URL, SORA_PORTFOLIO_TOKEN } from "$app/env/private";
import { z } from "zod";
import type { PageServerLoad } from "./$types";

const ResponseSchema = z.object({ titles: z.array(z.string()).max(3) });
let cached: { titles: string[]; expiresAt: number } | undefined;
let pending: Promise<string[]> | undefined;

async function fetchTitles(apiUrl: string, token: string): Promise<string[]> {
  try {
    const response = await fetch(new URL("/v1/public/now-watching", apiUrl), {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(1500),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Sora returned a non-success status");
    const { titles } = ResponseSchema.parse(await response.json());
    cached = { titles, expiresAt: Date.now() + 5 * 60_000 };
    return titles;
  } catch {
    console.warn("Sora now-watching unavailable; retrying after 60 seconds");
    cached = { titles: [], expiresAt: Date.now() + 60_000 };
    return [];
  }
}

export const load: PageServerLoad = async () => {
  if (!SORA_API_URL || !SORA_PORTFOLIO_TOKEN) return { nowWatching: [] };
  if (cached && cached.expiresAt > Date.now()) return { nowWatching: cached.titles };
  pending ??= fetchTitles(SORA_API_URL, SORA_PORTFOLIO_TOKEN);
  try {
    return { nowWatching: await pending };
  } finally {
    pending = undefined;
  }
};
