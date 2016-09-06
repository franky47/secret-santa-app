import mutations from './mutations'
import Vue from 'vue'
import * as i18n from '../../../i18n/i18n'
import * as getters from './getters'
import nativeLocale from 'locale2'
import localStorage from '../../../api/localStorage'

export const initLocale = ({dispatch, state}) => {
    dispatch(mutations.INIT, nativeLocale)
    const persistentLocale = localStorage.get('locale')
    const locale = persistentLocale || nativeLocale
    return setLocale({dispatch, state}, locale)
}

export const loadLocale = ({dispatch, state}, locale) => {
    if (!getters.hasLocale(state, locale)) {
        return i18n.loadLocale(locale).then(() => {
            dispatch(mutations.ADD_LOCALE, locale)
            return Promise.resolve()
        }).catch(error => {
            dispatch(mutations.ERROR, error)
            return Promise.reject(error)
        })
    }
    return Promise.resolve()
}

export const setLocale = ({dispatch, state}, locale) => {
    const suited = i18n.getSuitableLocaleFor(locale)
    return loadLocale({dispatch, state}, suited).then(() => {
        Vue.config.lang = suited
        dispatch(mutations.SET_LOCALE, suited)
        return Promise.resolve(suited)
    })
}
