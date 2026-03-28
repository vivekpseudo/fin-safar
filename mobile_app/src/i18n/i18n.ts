import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en';
import hi from './locales/hi';
import kn from './locales/kn';
import mr from './locales/mr';
import ta from './locales/ta';
import te from './locales/te';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin = {
    type: 'languageDetector' as const,
    async: true,
    init: () => { },
    detect: async function (callback: (lang: string) => void) {
        try {
            // get stored language from Async storage
            const language = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
            if (language) {
                return callback(language);
            } else {
                // if no language is stored, default to en
                return callback('en');
            }
        } catch (error) {
            console.log('Error reading language', error);
            return callback('en');
        }
    },
    cacheUserLanguage: async function (language: string) {
        try {
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
        } catch (error) {
            console.log('Error saving language', error);
        }
    },
};

i18n
    .use(initReactI18next)
    .use(languageDetectorPlugin)
    .init({
        resources: {
            en,
            hi,
            kn,
            mr,
            ta,
            te
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        react: {
            useSuspense: false, // to avoid suspense issues in RN
        },
    });

export default i18n;
