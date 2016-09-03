import { I18N_SET_LOCALE } from '../../mutation-types'
import localStorage from '../../../api/localStorage'
import { locale } from './getters'

const subscriptions = {
    [I18N_SET_LOCALE]: ({state}) => {
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
