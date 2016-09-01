import Vue from 'vue'
import VueI18n from 'vue-i18n'

export const localeNames = {
    'en': 'English',
    'fr': 'Français'
}

export const supportedLocales = {
    'en': /en[-_]?.*/,
    'fr': /fr[-_]?.*/
}

export const getSuitableLocaleFor = locale => {
    let matched = null
    for (const key in supportedLocales) {
        if (locale.match(supportedLocales[key])) {
            matched = key
            break
        }
    }
    return matched || 'en'
}

export const loadLocale = locale => {
    console.log('Loading locale ' + locale)
    return new Promise((resolve, reject) => {
        try {
            Vue.locale(locale, require(`./translations/${locale}`).default)
            console.log('Loaded locale ' + locale)
            resolve(locale)
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
}

Vue.use(VueI18n)
