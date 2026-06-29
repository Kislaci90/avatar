import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translate.json';
import huTranslation from './locales/hu/translate.json';
import deTranslation from './locales/de/translate.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  hu: {
    translation: huTranslation,
  },
  de: {
    translation: deTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'hu',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

