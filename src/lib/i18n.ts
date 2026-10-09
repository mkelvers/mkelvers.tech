import { page } from "$app/state";
import i18next from "i18next";
import da from "./messages/da.json";
import en from "./messages/en.json";

export const languages = ["en", "da"] as const;
export type Lang = (typeof languages)[number];

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    returnObjects: true;
    resources: {
      translation: typeof en;
    };
  }
}

const resources: Record<
  Lang,
  {
    translation: typeof en;
  }
> = {
  en: {
    translation: en,
  },
  da: {
    translation: da,
  },
};

i18next.init({
  resources,
  fallbackLng: "en",
  initAsync: false,
  returnObjects: true,
  interpolation: {
    escapeValue: false,
  },
});

export const t = ((
  key: string,
  options?: {
    lang?: string;
  },
) =>
  i18next.t(key as never, {
    ...options,
    lng: options?.lang ?? page.data.lang,
  })) as unknown as typeof i18next.t;
