import { form, getRequestEvent } from "$app/server";
import { z } from "zod";
import { languages } from "#lib/i18n.ts";

export const setLang = form(
  z.object({
    lang: z.enum(languages),
  }),
  ({ lang }) => {
    getRequestEvent().cookies.set("lang", lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  },
);
