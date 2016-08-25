// import Vue from 'vue'
import {
    AUTH_SIGNED_IN,
    AUTH_SIGNED_OUT,
    AUTH_USER_CHANGED,
    AUTH_ERROR
} from '../../mutation-types'

const state = {
    signedIn: false,
    user: null,
    error: null
}

const mutations = {
    [AUTH_SIGNED_IN] (state) {
        state.signedIn = true
        state.error = null
    },
    [AUTH_SIGNED_OUT] (state) {
        state.signedIn = false
        state.error = null
    },
    [AUTH_USER_CHANGED] (state, user) {
        state.user = user
        state.error = null
    },
    [AUTH_ERROR] (state, error) {
        state.error = error
    }
}

export default {
    state,
    mutations
}
