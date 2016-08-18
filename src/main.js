import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import './semantic'

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App },
    store
})
