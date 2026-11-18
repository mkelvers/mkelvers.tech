import type { HandleClientError } from "@sveltejs/kit/hooks";

export const handleError: HandleClientError = ({ kind, error }) => {
  if (kind === "unknown") {
    console.error(error);
  }

  if (!navigator.onLine) {
    return {
      message: "You appear to be offline. Check your connection.",
    };
  }
  if (kind === "unknown") {
    return {
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
