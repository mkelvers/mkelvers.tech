import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import da from "@/lib/locales/da.json";
import en from "@/lib/locales/en.json";

const LANGUAGE_KEY = "portfolio-language";

export const hasLanguagePreference = (): boolean =>
	localStorage.getItem(LANGUAGE_KEY) !== null;

export const changeLanguage = (lang: string): void => {
	i18n.changeLanguage(lang);
	localStorage.setItem(LANGUAGE_KEY, lang);
};

const resources = {
	en: { translation: en },
	da: { translation: da },
};

i18n.use(initReactI18next).init({
	resources,
	lng: localStorage.getItem(LANGUAGE_KEY) ?? "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export { i18n };
