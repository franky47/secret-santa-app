import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import auth from './modules/auth/store'
import i18n from './modules/i18n/store'

// --

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        i18n
    }
})
