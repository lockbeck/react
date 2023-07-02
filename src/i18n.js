import i18n from 'i18next';
import LanguageDetector  from "i18next-browser-languagedetector";
import translationsEn from './assets/locales/en/translation';
import translationsRu from './assets/locales/ru/translation';
import translationsUz from './assets/locales/uz/translation';
import { initReactI18next } from 'react-i18next';

const path = require('path');
i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        // lng: ['en'],
        fallbackLng: ['en'],
        supportedLngs: [
            'en', 'ru', 'uz'
        ],
        whitelist: [
            'en', 'ru', 'uz',
        ],
        debug: false,
        detection: {
            order: ['cookie', 'querystring', 'htmlTag', 'localStorage', 'path', 'subdomain'],
            caches: ['cookie'],
        },
        resources: {
            en: {
                translation: translationsEn,
            },
            uz: {
                translation: translationsUz,
            },
            ru: {
                translation: translationsRu,
            }
        },
        ns: ['translation'],
        defaultNS: ['translation'],
        react: {
            wait: true
        },
        saveMissing: true
    });

export default i18n;