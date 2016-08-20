import './semantic'
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router/router'
import { sync } from 'vuex-router-sync'
import './style.css'

sync(store, router)

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App },
    store,
    router
})
