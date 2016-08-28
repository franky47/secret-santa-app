import Vue from 'vue'
import VueI18n from 'vue-i18n'

// todo: check if there's not that already available on NPM..
export const localeNames = {
    'en': 'English',
    'fr': 'Français'
}

export const supportedLocales = [
    'en', 'fr'
]

export const loadLocale = locale => {
    return new Promise((resolve, reject) => {
        try {
            Vue.locale(locale, require(`./translations/${locale}`).default)
            resolve(locale)
        } catch (error) {
            reject(error)
        }
    })
}

Vue.use(VueI18n)
