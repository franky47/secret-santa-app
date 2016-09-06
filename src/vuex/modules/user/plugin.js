import {
    createUser,
    updateUser,
    watchUser
} from '../../../api/db/user'
import userMutations from './mutations'
import authMutations from '../auth/mutations'
import { getCurrentUserObject } from './getters'

const observers = {
    user: {
        start(user, dispatch) {
            if (!user || !user.uid) {
                throw new TypeError("Can't observe null user id")
            }
            this.unregister() // stop observing previous user (if any)
            createUser(user.uid, user).then(() => {
                this.unregister = watchUser(user.uid, snapshot => {
                    const data = snapshot.val()
                    if (data) {
                        dispatch(userMutations.CHANGED, data)
                    } else {
                        console.log('Could not find user info')
                    }
                })
            })
        },
        stop() {
            this.unregister()
            this.unregister = () => {}
        },
        unregister: () => {}
    }
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
            observers.user.start(user, dispatch)
        } else {
            observers.user.stop()
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
