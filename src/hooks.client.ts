import type { HandleClientError } from "@sveltejs/kit/hooks";
import { t } from "#lib/i18n.ts";

export const handleError: HandleClientError = ({ kind, error }) => {
  const lang = document.documentElement.lang;

  if (kind === "unknown") {
    console.error(error);
  }

  if (!navigator.onLine)
    return {
      message: t("error.offline", {
        lang,
      }),
    };

  if (kind === "unknown")
    return {
      message: t("error.unexpected", {
        lang,
      }),
    };
};
