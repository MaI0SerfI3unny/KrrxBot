import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from './locales/en/lang.json';
import translationRu from './locales/ru/lang.json';
import translationTu from './locales/tu/lang.json';

const resources = {
  en: {
    translation: translationEn
  },
  ru: {
    translation: translationRu
  },
  tr: {
    translation: translationTu
  },
};

const lang = ['tr','en', 'ru'];

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru",
    whitelist: lang,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
