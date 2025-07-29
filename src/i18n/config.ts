import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en/common.json';
import tr from '../locales/tr/common.json';
import zh from '../locales/zh/common.json';
import hi from '../locales/hi/common.json';
import es from '../locales/es/common.json';
import de from '../locales/de/common.json';
import fr from '../locales/fr/common.json';
import it from '../locales/it/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      zh: { translation: zh },
      hi: { translation: hi },
      es: { translation: es },
      de: { translation: de },
      fr: { translation: fr },
      it: { translation: it },
    },
    fallbackLng: 'en', // Simplified fallback
    lng: 'tr', // Default language - Türkçe başlangıç
    interpolation: { 
      escapeValue: false 
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'tasteMirror_language',
    },
    react: {
      useSuspense: false, // This is important for SSR and better error handling
    },
    debug: false, // Production'da false olmalı
  });

export default i18n;
