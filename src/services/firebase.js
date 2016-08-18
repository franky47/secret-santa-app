import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { AUTH_USER_CHANGED } from '../vuex/mutation-types'
import store from '../vuex/store'

const handleErrorWhile = (context) => (error) => {
    console.log('Error caught while ${context}: ', error)
    return Promise.reject(error) // Allow chaining of error handlers
}

class FirebaseService {
    constructor(config = {}, authChangedCallback) {
        console.log('Creating new Firebase Service')
        firebase.initializeApp(config)
        firebase.auth().onAuthStateChanged(authChangedCallback)
    }

    // Auth --
    registerWithEmail(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(handleErrorWhile('registering new account'))
    }
    signInWithEmail(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(handleErrorWhile('signing in with email'))
    }
    signInWithFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider()
        provider.addScope('public_profile')
        return firebase.auth().signInWithRedirect(provider)
            .catch(handleErrorWhile('signing in with Facebook'))
    }
    signOut() {
        return firebase.auth().signOut()
            .catch(handleErrorWhile('signing out'))
    }

    get currentUser() {
        return firebase.auth().currentUser
    }

    updateUserProfile(profile) {
        const user = this.currentUser
        if (user) {
            return user.updateProfile(profile)
                .catch(error => console.log('Error caught while updating profile: ', error))
        }
        return Promise.resolve()
    }
    updateUserEmail(email) {
        const user = this.currentUser
        if (user) {
            return user.updateEmail(email)
                .catch(error => {
                    // todo: might need to reauthenticate
                    console.log('Error caught while updating email: ', error)
                })
        }
        return Promise.resolve()
    }
    updateUserPassword(password) {
        const user = this.currentUser
        if (user) {
            return user.updatePassword(password)
                .catch(error => {
                    // todo: might need to reauthenticate
                    console.log('Error caught while updating email: ', error)
                })
        }
        return Promise.resolve()
    }
    sendPasswordResetEmail(email) {
        const auth = firebase.auth()
        return auth.sendPasswordResetEmail(email)
            .catch(handleErrorWhile('sending password reset email'))
    }
    deleteUserAccount() {
        const user = this.currentUser
        user.delete().catch(handleErrorWhile('deleting user account'))
    }

  // Database --
}

const authChangedCallback = (user) => {
    console.log('Auth changed to ', user)
    store.dispatch(AUTH_USER_CHANGED, user)
}

export default new FirebaseService({
    apiKey: 'AIzaSyBf_R63edemA5-TUQ5x0e1blXfPcrUtrL4',
    authDomain: 'secret-santa-e1f38.firebaseapp.com',
    databaseURL: 'https://secret-santa-e1f38.firebaseio.com',
    storageBucket: 'secret-santa-e1f38.appspot.com'
}, authChangedCallback)
