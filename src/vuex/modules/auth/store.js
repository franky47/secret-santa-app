import auth from './mutations'

const state = {
    signedIn: false,
    firebaseUser: null,
    error: null
}

const mutations = {
    [auth.SIGNED_IN] (state) {
        state.signedIn  = true
        state.error     = null
    },
    [auth.SIGNED_OUT] (state) {
        state.signedIn  = false
        state.error     = null
    },
    [auth.USER_CHANGED] (state, user) {
        state.firebaseUser = user
        state.error = null
    },
    [auth.ERROR] (state, error) {
        state.error = error
    }
}

export default {
    state,
    mutations
}
