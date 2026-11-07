import { redirect } from "@sveltejs/kit";
import type { Handle, HandleServerError } from "@sveltejs/kit/hooks";
import { pick } from "accept-language-parser";
import { languages, t } from "#lib/i18n.ts";

export const handle: Handle = ({ event, resolve }) => {
  const { url, cookies, request } = event;
  const requested = languages.find(
    (code) => code === url.searchParams.get("lang"),
  );

  if (requested) {
    cookies.set("lang", requested, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    url.searchParams.delete("lang");
    redirect(303, url.pathname + url.search);
  }

  const lang =
    languages.find((code) => code === cookies.get("lang")) ??
    pick([...languages], request.headers.get("accept-language") ?? "", {
      loose: true,
    }) ??
    "en";

  event.locals.lang = lang;
  event.setHeaders({
    vary: "Accept-Language, Cookie",
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
  });

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", lang),
    // Fetch the two weights the first screen uses early, so text never flashes in a fallback font.
    preload: (file) =>
      file.type === "font"
        ? /open-runde-latin-(400|500)-normal\.woff2$/.test(file.filename)
        : file.type === "js" || file.type === "css",
  });
};

export const handleError: HandleServerError = ({ kind, event, error }) => {
  if (kind !== "unknown") {
    return;
  }

  console.error(`${event.request.method} ${event.url.pathname}`, error);

  return {
    message: t("error.unexpected", {
      lang: event.locals.lang,
    }),
  };
};
