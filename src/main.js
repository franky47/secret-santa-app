import './semantic'
import App from './App'
import store from './vuex/store'
import router from './router/router'
import { sync } from 'vuex-router-sync'
import './style.css'

sync(store, router)

router.start({
    store,
    components: { App }
}, '#app')
