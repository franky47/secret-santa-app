import Vue from 'vue'
import VueI18n from 'vue-i18n'
import userLocale from 'locale2'

export const setLocale = locale => { Vue.config.lang = locale }
export const loadLocale = locale => {
    Vue.locale(locale, require(`./translations/${locale}`).default)
}

Vue.use(VueI18n)
setLocale(userLocale)

console.log('User locale', userLocale)

// Load locales
loadLocale('en')
loadLocale('fr')

export default userLocale
