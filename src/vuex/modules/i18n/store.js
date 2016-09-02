import {
    I18N_INIT,
    I18N_SET_LOCALE,
    I18N_ADD_LOCALE,
    I18N_ERROR
} from '../../mutation-types'
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

export const plugin = store => {
    store.subscribe((mutation, state) => {
        switch (mutation.type) {
        case I18N_SET_LOCALE:
            localStorage.set('locale', mutation.payload[0])
            break
        }
    })
}
