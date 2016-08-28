import './semantic'
import App from './App'
import './i18n/i18n'
import store from './vuex/store'
import router from './router/router'
import firebase from './services/firebase'
import FirebaseAuth from './services/firebase-auth'
import FirebaseStorage from './services/firebase-storage'
import { sync } from 'vuex-router-sync'
import {
    authChangedCallback,
    authErrorCallback
} from './vuex/modules/auth/actions'
import './style.css'

sync(store, router)

firebase.use(FirebaseAuth, {
    callbacks: {
        changed: user  => authChangedCallback(store, user),
        error:   error => authErrorCallback(store, error)
    }
})
firebase.use(FirebaseStorage, {})

firebase.auth.getRedirectResult().then(user => {
    // Start the routed when auth state is known,
    // to avoid FOUC (Flashes Of Unauthorized Content).
    router.start({
        store,
        components: { App }
    }, '#app')
})
