import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import auth from './modules/auth/store'
import i18n, { plugin as i18nPlugin } from './modules/i18n/store'

// --

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        i18n
    },
    plugins: [
        i18nPlugin
    ]
})
