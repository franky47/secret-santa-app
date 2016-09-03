import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import auth         from './modules/auth/store'
import authPlugin   from './modules/auth/plugin'
import i18n         from './modules/i18n/store'
import i18nPlugin   from './modules/i18n/plugin'
import user         from './modules/user/store'
import userPlugin   from './modules/user/plugin'

// --

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        i18n,
        user
    },
    plugins: [
        authPlugin,
        i18nPlugin,
        userPlugin
    ]
})
