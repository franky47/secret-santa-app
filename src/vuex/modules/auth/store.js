// vuex/modules/auth.js

import {
    AUTH_USER_CHANGED,
    AUTH_ERROR
} from '../../mutation-types'

const state = {
    user: null,
    error: null
}

const mutations = {
    [AUTH_USER_CHANGED] (state, user) {
        state.user = user
        state.error = null
    },
    [AUTH_ERROR] (state, error) {
        state.user = null
        state.error = error
    }
}

export default {
    state,
    mutations
}
