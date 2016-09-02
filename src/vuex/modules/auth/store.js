import {
    AUTH_SIGNED_IN,
    AUTH_SIGNED_OUT,
    AUTH_USER_CHANGED,
    AUTH_ERROR
} from '../../mutation-types'

const defaults = {
    photoURL: 'http://gravatar.com/avatar?d=mm&s=100'
}

const state = {
    signedIn: false,
    firebaseUser: null,
    user: {
        uid:    '',
        email:  '',
        name:   '',
        photoURL: defaults.photoURL
    },
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
        if (user) {
            state.user.uid      = user.uid
            state.user.email    = user.email
            state.user.name     = user.displayName || user.email
            state.user.photoURL = user.photoURL || defaults.photoURL
        } else {
            state.user.uid      = ''
            state.user.name     = ''
            state.user.email    = ''
            state.user.photoURL = defaults.photoURL
        }
        state.firebaseUser = user
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
