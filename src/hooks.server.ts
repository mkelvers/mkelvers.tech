import type { Handle, HandleServerError } from "@sveltejs/kit/hooks";
import { copy } from "#lib/copy.ts";

export const handle: Handle = ({ event, resolve }) => {
  event.setHeaders({
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
  });

  return resolve(event, {
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
    message: copy.error.unexpected,
  };
};
