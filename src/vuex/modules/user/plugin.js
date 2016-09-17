import {
    createUser,
    updateUser,
    markUserAsOnline,
    markUserAsOffline
} from '../../../api/db/user'
import userMutations from './mutations'
import authMutations from '../auth/mutations'
import { getCurrentUserObject } from './getters'
import { ValueChangedObserver } from '../../../services/observers'
import * as paths from '../../../api/db/paths'

const observers = {
    user: new ValueChangedObserver()
}

let currentUserId = null

const subscriptions = {
    [userMutations.RESET]: () => {
        observers.user.stop()
    },
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
            if (currentUserId !== null) {
                markUserAsOffline(currentUserId)
            }
            createUser(user.uid, user).then(() => {
                return updateUser(user.uid, user)
            })
            .then(() => {
                // Connect database to mutation
                const path = paths.user(user.uid)
                observers.user.start(path, data => {
                    if (!data) {
                        console.warn('Invalid data from database')
                    } else {
                        data.uid = user.uid // Append uid as it's not stored in db
                        dispatch(userMutations.CHANGED, data)
                    }
                })
            })
            .catch(error => {
                console.log(`Error while creating/updating user on ${authMutations.USER_CHANGED}: ${error.message}`)
            })
            currentUserId = user.uid
            markUserAsOnline(user.uid)
        } else {
            dispatch(userMutations.RESET)
            // Don't mark user as offline here as the database is write-protected
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
