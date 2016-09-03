import i18n from './mutations'
import localStorage from '../../../api/localStorage'

const state = {
    locale: {
        native: null,
        current: localStorage.get('locale') || null,
        loaded: []
    },
    error: null
}

const mutations = {
    [i18n.INIT]: (state, nativeLocale) => {
        state.locale.native = nativeLocale
    },
    [i18n.SET_LOCALE]: (state, locale) => {
        state.locale.current = locale
    },
    [i18n.ADD_LOCALE]: (state, locale) => {
        if (state.locale.loaded.indexOf(locale) === -1) {
            state.locale.loaded.push(locale)
        }
    },
    [i18n.ERROR]: (state, error) => {
        state.error = error
    }
}

export default {
    state,
    mutations
}

