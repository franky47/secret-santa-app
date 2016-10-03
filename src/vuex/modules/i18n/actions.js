import mutations from './mutations'
import Vue from 'vue'
import * as i18n from '../../../i18n/i18n'
import * as getters from './getters'
import nativeLocale from 'locale2'
import localStorage from '../../../api/localStorage'

export const initLocale = ({commit, state}) => {
    commit(mutations.INIT, nativeLocale)
    const persistentLocale = localStorage.get('locale')
    const locale = persistentLocale || nativeLocale
    return setLocale({commit, state}, locale)
}

export const loadLocale = ({commit, state}, locale) => {
    if (!getters.hasLocale(state, locale)) {
        return i18n.loadLocale(locale).then(() => {
            commit(mutations.ADD_LOCALE, locale)
            return Promise.resolve()
        }).catch(error => {
            commit(mutations.ERROR, error)
            return Promise.reject(error)
        })
    }
    return Promise.resolve()
}

export const setLocale = ({commit, state}, locale) => {
    const suited = i18n.getSuitableLocaleFor(locale)
    return loadLocale({commit, state}, suited).then(() => {
        Vue.config.lang = suited
        commit(mutations.SET_LOCALE, suited)
        return Promise.resolve(suited)
    })
}
