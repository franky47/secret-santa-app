import i18nMutations from './mutations'
import * as user from '../user'
import localStorage from '../../../api/localStorage'
import { locale } from './getters'

let userId = null

const getLocaleKey = () => userId ? `locale_${userId}` : 'locale'

const subscriptions = {
    [i18nMutations.SET_LOCALE]: ({state}) => {
        localStorage.set(getLocaleKey(), locale(state))
    },
    [user.mutations.CHANGED]: ({state}) => {
        const prevKey  = getLocaleKey()
        const prevUser = userId
        userId = user.getters.getCurrentUser.uid(state)
        if (prevUser === null && userId !== null) {
            // Copy "root" setting to dedicated user
            const value = localStorage.get(prevKey)
            localStorage.delete(prevKey)
            localStorage.set(getLocaleKey(), value)
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
