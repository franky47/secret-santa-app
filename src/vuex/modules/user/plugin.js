import {
    createUser,
    updateUser
} from '../../../api/db/user'
import userMutations from './mutations'
import authMutations from '../auth/mutations'
import { getCurrentUserObject } from './getters'
import { ValueChangedObserver } from '../../../services/observers'
import * as paths from '../../../api/db/paths'

const observers = {
    user: new ValueChangedObserver()
}

const subscriptions = {
    [userMutations.CHANGED]: ({state}) => {
        const user = getCurrentUserObject(state)
        createUser(user.uid, user).then(() => {
            updateUser(user.uid, user)
        }).catch(error => {
            console.log(`Error while creating/updating user on ${userMutations.CHANGED}: ${error.message}`)
        })
    },
    [authMutations.USER_CHANGED]: ({dispatch}, mutation) => {
        const user = mutation.payload[0]
        if (user) {
            const path = paths.user(user.uid)
            observers.user.start(path, data => {
                if (data) {
                    dispatch(userMutations.CHANGED, data)
                } else {
                    createUser(user.uid, user)
                }
            })
        } else {
            observers.user.stop()
            dispatch(userMutations.RESET)
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
