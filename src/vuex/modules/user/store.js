import user from './mutations'

const defaults = {
    photoURL: 'http://gravatar.com/avatar?d=mm&s=100'
}

const state = {
    uid:            null,
    email:          null,
    displayName:    null,
    photoURL:       defaults.photoURL
}

const mutations = {
    [user.RESET]: (state) => {
        state.uid           = null
        state.email         = null
        state.displayName   = null
        state.photoURL      = defaults.photoURL
    },
    [user.CHANGED]: (state, user) => {
        // Update only what's changed
        for (const key in state) {
            if (key in user) {
                state[key] = user[key]
            }
        }
    }
}

export default {
    state,
    mutations
}
