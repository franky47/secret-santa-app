// import './semantic'
import App from './App'
import './i18n/i18n'
import store                from './vuex/store'
import router               from './router/router'
import firebase             from './services/firebase'
import FirebaseAuth         from './services/firebase/auth'
import FirebaseDatabase     from './services/firebase/database'
import FirebaseStorage      from './services/firebase/storage'
import { sync } from 'vuex-router-sync'
import {
    authChangedCallback,
    authErrorCallback
} from './vuex/modules/auth/actions'
import { initLocale } from './vuex/modules/i18n/actions'
import './style.css'

const logDebugInfo = (text) => {
    console.log(text)
    // Display error on home page, for debugging on mobile devices.
    const debugInfoDiv = document.getElementById('debug-info')
    const debugInfoPre = document.createElement('pre')
    const debugInfoTxt = document.createTextNode(text.toString())
    debugInfoPre.appendChild(debugInfoTxt)
    debugInfoDiv.appendChild(debugInfoPre)
}

sync(store, router)

firebase.use(FirebaseAuth, {
    callbacks: {
        changed: user  => authChangedCallback(store, user),
        error:   error => authErrorCallback(store, error)
    }
})
firebase.use(FirebaseDatabase, {})
firebase.use(FirebaseStorage, {})

Promise.all([
    firebase.auth.getRedirectResult().catch(error => {
        if (error.code === 'auth/timeout') {
            return Promise.resolve()
        }
    }),
    initLocale(store)
]).then(() => {
    // Start the router when everything is initialized,
    // to avoid FOUC (Flashes Of Unauthorized Content).
    router.start({
        store,
        components: { App }
    }, '#app')
}).catch(error => {
    console.log('Error starting app:' + error.message)
    logDebugInfo(error.toString())
})
