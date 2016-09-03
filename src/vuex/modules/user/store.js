import {
    USER_SET_INFO
} from '../../mutation-types'

const state = {
    uid:            null,
    info: {
        displayName:    null,
        photoURL:       null
    }
}

const mutations = {
    [USER_SET_INFO]: (state, user) => {
        state.uid               = user.uid          || null
        state.info.displayName  = user.displayName  || null
        state.info.photoURL     = user.photoURL     || null
    }
}

export default {
    state,
    mutations
}
