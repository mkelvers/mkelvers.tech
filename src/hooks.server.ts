import type { Handle, HandleServerError } from "@sveltejs/kit/hooks";

export const handle: Handle = ({ event, resolve }) => {
  event.setHeaders({
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
  });

  return resolve(event, {
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
    message: "An unexpected error occurred. Please try again.",
  };
};
