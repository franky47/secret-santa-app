import {
    createUser,
    updateUser,
    watchUser
} from '../../../api/db/user'
import userMutations from './mutations'
import authMutations from '../auth/mutations'
import { getCurrentUserObject } from './getters'
import { errorWhile } from '../../../utility'

const watchers = {
    user: {
        off: () => {}
    }
}

const subscriptions = {
    [userMutations.CHANGED]: ({state}) => {
        console.log('user changed, sub => create/update in db')
        const user = getCurrentUserObject(state)
        createUser(user.uid, user).then(() => {
            updateUser(user.uid, user)
        })
    },
    [authMutations.SIGNED_IN]: ({dispatch, state}) => {
        console.log('user signed in, sub => attach listeners')
        const user = state.auth.user
        watchers.user.off() // Unregister previous watcher (if any)
        watchers.user.off = watchUser(user.uid, snapshot => {
            const user = snapshot.val()
            dispatch(userMutations.CHANGED, user)
        })
    },
    [authMutations.SIGNED_OUT]: ({dispatch}) => {
        console.log('user signed out, sub => detach listeners')
        watchers.user.off() // Unregister watcher
        watchers.user.off = () => {}
        dispatch(userMutations.RESET)
    },
    [authMutations.USER_CHANGED]: ({dispatch}, mutation) => {
        const user = mutation.payload[0]
        if (user) {
            console.log('User changed in auth module, updating user info', user)
            dispatch(userMutations.CHANGED, user)
        }
    }
}

export default function createPlugin(store) {
    store.subscribe((mutation, state) => {
        const type = mutation.type
        if (type in subscriptions) {
            subscriptions[type](store, mutation)
        }
    })
}
