import mutations from './mutations'
import localStorage from '../../../api/localStorage'
import { locale } from './getters'

const subscriptions = {
    [mutations.SET_LOCALE]: ({state}) => {
        localStorage.set('locale', locale(state))
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
