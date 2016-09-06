import i18nMutations from './mutations'
import { setLocale } from './actions'
import * as user from '../user'
import * as getters from './getters'
import * as paths from '../../../api/db/paths'
import { ValueChangedObserver } from '../../../services/observers'
import firebase from '../../../services/firebase'

let userId = null

const observers = {
    userLocale: new ValueChangedObserver()
}

const subscriptions = {
    [i18nMutations.SET_LOCALE]: ({state}) => {
        userId = user.getters.getCurrentUser.uid(state)
        if (userId) {
            const path = paths.userPreferences.locale(userId)
            const currentLocale = getters.locale(state)
            firebase.db.set(path, currentLocale)
        }
    },
    [user.mutations.CHANGED]: ({dispatch, state}) => {
        userId = user.getters.getCurrentUser.uid(state)
        if (userId === null) {
            // Signed out: restore system native locale
            observers.userLocale.stop()
            const nativeLocale = getters.nativeLocale(state)
            setLocale({dispatch, state}, nativeLocale)
        } else {
            // Signed in: sync to user preferred locale
            const path = paths.userPreferences.locale(userId)
            observers.userLocale.start(path, data => {
                if (data) {
                    setLocale({dispatch, state}, data)
                } else {
                    // Init database entry
                    const currentLocale = getters.locale(state) || getters.nativeLocale(state)
                    firebase.db.set(path, currentLocale)
                }
            })
        }
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
