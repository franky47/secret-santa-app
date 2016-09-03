import {
    createUser,
    updateUser,
    watchUser
} from '../../../api/db/user'
import userMutations from './mutations'
import authMutations from '../auth/mutations'
import { info as getUserInfo } from './getters'

const watchers = {
    user: {
        off: () => {}
    }
}

const subscriptions = {
    [userMutations.SET_INFO]: ({state}) => {
        const user = getUserInfo(state)
        createUser(user.uid, user).then(() => {
            updateUser(user.uid, user)
        })
    },
    [authMutations.SIGNED_IN]: ({dispatch, state}) => {
        const user = state.auth.user
        watchers.user.off()
        watchers.user.off = watchUser(user.uid, snapshot => {
            const user = snapshot.val()
            dispatch(userMutations.SET_INFO, user)
        })
    },
    [authMutations.SIGNED_OUT]: () => {
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
