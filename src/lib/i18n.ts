import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/lib/locales/en.json'
import da from '@/lib/locales/da.json'

const LANGUAGE_KEY = 'portfolio-language'

export const getStoredLanguage = (): string | null => {
  return localStorage.getItem(LANGUAGE_KEY)
}

export const setStoredLanguage = (lang: string): void => {
  localStorage.setItem(LANGUAGE_KEY, lang)
}

export const hasLanguagePreference = (): boolean => {
  return localStorage.getItem(LANGUAGE_KEY) !== null
}

const resources = {
  en: { translation: en },
  da: { translation: da },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage() ?? 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export { i18n }
