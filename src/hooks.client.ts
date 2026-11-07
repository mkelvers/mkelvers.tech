import type { HandleClientError } from "@sveltejs/kit/hooks";
import { copy } from "#lib/copy.ts";

export const handleError: HandleClientError = ({ kind, error }) => {
  if (kind === "unknown") {
    console.error(error);
  }

  if (!navigator.onLine) return { message: copy.error.offline };
  if (kind === "unknown") return { message: copy.error.unexpected };
};
