import {
    createUser,
    updateUser,
    watchUser
} from '../../../api/db/user'
import {
    AUTH_SIGNED_IN,
    AUTH_SIGNED_OUT,
    USER_SET_INFO
} from '../../mutation-types'
import { info as getUserInfo } from './getters'

const watchers = {
    user: {
        off: () => {}
    }
}

const subscriptions = {
    [USER_SET_INFO]: ({state}) => {
        const user = getUserInfo(state)
        createUser(user.uid, user).then(() => {
            updateUser(user.uid, user)
        })
    },
    [AUTH_SIGNED_IN]: ({dispatch, state}) => {
        const user = state.auth.user
        watchers.user.off()
        watchers.user.off = watchUser(user.uid, snapshot => {
            const user = snapshot.val()
            dispatch(USER_SET_INFO, user)
        })
    },
    [AUTH_SIGNED_OUT]: () => {
        watchers.user.off() // Unregister watcher
        watchers.user.off = () => {}
    }
}

export default function createPlugin(store) {
    store.subscribe((mutation, state) => {
        const type = mutation.type
        if (type in subscriptions) {
            subscriptions[type](store)
        }
    })
}
