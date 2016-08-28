import {
    I18N_INIT,
    I18N_ADD_LOCALE,
    I18N_SET_LOCALE,
    I18N_ERROR
} from '../../mutation-types'
import Vue from 'vue'
import * as i18n from '../../../i18n/i18n'
import * as getters from './getters'
import nativeLocale from 'locale2'

export const initLocale = ({dispatch, state}) => {
    dispatch(I18N_INIT, nativeLocale)
    return setLocale({dispatch, state}, nativeLocale)
}

export const loadLocale = ({dispatch, state}, locale) => {
    if (!getters.hasLocale(state, locale)) {
        return i18n.loadLocale(locale).then(() => {
            dispatch(I18N_ADD_LOCALE, locale)
            dispatch(I18N_ERROR, null)
            return Promise.resolve()
        }).catch(error => {
            dispatch(I18N_ERROR, error)
            return Promise.reject(error)
        })
    }
    return Promise.resolve()
}

export const setLocale = ({dispatch, state}, locale) => {
    return loadLocale({dispatch, state}, locale).then(() => {
        Vue.config.lang = locale
        dispatch(I18N_SET_LOCALE, locale)
        return Promise.resolve(locale)
    })
}
