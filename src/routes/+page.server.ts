import { SORA_API_URL, SORA_PORTFOLIO_TOKEN } from "$app/env/private";
import { z } from "zod";
import type { PageServerLoad } from "./$types";

let cache = {
  titles: [] as string[],
  expiresAt: 0,
};

export const load: PageServerLoad = async () => {
  if (!SORA_API_URL || !SORA_PORTFOLIO_TOKEN) {
    return {
      nowWatching: [],
    };
  }

  if (cache.expiresAt > Date.now()) {
    return {
      nowWatching: cache.titles,
    };
  }

  try {
    const response = await fetch(new URL("/v1/public/now-watching", SORA_API_URL), {
      headers: {
        Authorization: `Bearer ${SORA_PORTFOLIO_TOKEN}`,
      },
      signal: AbortSignal.timeout(1500),
      redirect: "error",
    });

    if (!response.ok) {
      throw new Error(`Sora responded with ${response.status}`);
    }

    const { titles } = z
      .object({
        titles: z.array(z.string()).max(3),
      })
      .parse(await response.json());
    cache = {
      titles,
      expiresAt: Date.now() + 5 * 60_000,
    };
  } catch (error) {
    console.warn("Sora now-watching unavailable, retrying in a minute", error);
    cache = {
      titles: [],
      expiresAt: Date.now() + 60_000,
    };
  }

  return {
    nowWatching: cache.titles,
  };
};
