import { defineEnvVars } from "@sveltejs/kit/env";
import { z } from "zod";

export const variables = defineEnvVars({
  SORA_API_URL: {
    schema: z.string().optional(),
  },
  SORA_PORTFOLIO_TOKEN: {
    schema: z.string().optional(),
  },
});
