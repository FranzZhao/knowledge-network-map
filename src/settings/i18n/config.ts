import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import json
import translation_en from './en.json';
import translation_zh from './zh.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: translation_en
    },
    zh: {
        translation: translation_zh
    }
};

i18n
    .use(initReactI18next) // 初始化
    .init({
        resources, //语言包
        lng: "zh", //初始化语言

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;