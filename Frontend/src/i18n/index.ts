import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_PT_BR from '../../public/locales/pt-br/translation.json'
import translation_EN_US from '../../public/locales/en-us/translation.json'

const resources = {
    "pt": {
        translation: translation_PT_BR
    },
    "en": {
        translation: translation_EN_US
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'pt',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    }
);

export default i18n;