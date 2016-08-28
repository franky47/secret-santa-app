import {
    I18N_INIT,
    I18N_SET_LOCALE,
    I18N_ADD_LOCALE,
    I18N_ERROR
} from '../../mutation-types'

const state = {
    locale: {
        native: null,
        current: null,
        loaded: []
    },
    error: null
}

const mutations = {
    [I18N_INIT]: (state, nativeLocale) => {
        state.locale.native = nativeLocale
    },
    [I18N_SET_LOCALE]: (state, locale) => {
        state.locale.current = locale
    },
    [I18N_ADD_LOCALE]: (state, locale) => {
        if (state.locale.loaded.indexOf(locale) === -1) {
            state.locale.loaded.push(locale)
        }
    },
    [I18N_ERROR]: (state, error) => {
        state.error = error
    }
}

export default {
    state,
    mutations
}
