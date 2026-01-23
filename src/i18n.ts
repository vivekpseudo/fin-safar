import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';

// Initialize with a simple configuration
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            hi: { translation: hi },
            mr: { translation: mr },
            // Add others as they are created
            ta: { translation: en }, // Fallback to en for now
            te: { translation: en },
            kn: { translation: en }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // React already safes from xss
        }
    });

export default i18n;
