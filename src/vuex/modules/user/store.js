import user from './mutations'

// const defaults = {
//     photoURL: 'https://gravatar.com/avatar?d=mm&s=100'
// }

const state = {
    uid:            null,
    email:          null,
    displayName:    null,
    photoURL:       null
}

const mutations = {
    [user.RESET]: (state) => {
        state.uid           = null
        state.email         = null
        state.displayName   = null
        state.photoURL      = null
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
