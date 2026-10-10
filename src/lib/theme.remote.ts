import { form, getRequestEvent } from "$app/server";
import { z } from "zod";

export const setTheme = form(
  z.object({
    theme: z.enum(["light", "dark"]),
  }),
  ({ theme }) => {
    getRequestEvent().cookies.set("theme", theme, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  },
);
