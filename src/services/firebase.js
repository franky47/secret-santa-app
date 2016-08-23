import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { AUTH_USER_CHANGED, AUTH_ERROR } from '../vuex/mutation-types'
import store from '../vuex/store'
import { errorWhile } from '../utility/utility'

class FirebaseService {
    constructor(config = {}, authChangedCallback, authErrorCallback = () => {}) {
        firebase.initializeApp(config)
        firebase.auth().onAuthStateChanged(authChangedCallback,
                                           authErrorCallback)
    }

    // Auth --
    registerWithEmail(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(errorWhile('registering new account'))
    }
    signInWithEmail(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(errorWhile('signing in with email'))
    }
    signInWithFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider()
        provider.addScope('public_profile')
        return firebase.auth().signInWithRedirect(provider)
            .catch(errorWhile('signing in with Facebook'))
    }
    signOut() {
        return firebase.auth().signOut()
            .catch(errorWhile('signing out'))
    }
    reauthenticate(email, password) {
        const user = this.currentUser
        const credential = firebase.auth.EmailAuthProvider.credential(email, password)
        if (user) {
            return user.reauthenticate(credential)
                .catch(errorWhile('reauthenticating'))
        }
        return Promise.reject({
            code: 'auth/null',
            message: 'No user signed in'
        })
    }

    get currentUser() {
        return firebase.auth().currentUser
    }

    updateUserProfile(profile) {
        const user = this.currentUser
        if (user) {
            return user.updateProfile(profile)
                .catch(errorWhile('updating profile'))
        }
        return Promise.reject({
            code: 'auth/null',
            message: 'No user signed in'
        })
    }
    updateUserEmail(email) {
        const user = this.currentUser
        if (user) {
            return user.updateEmail(email)
                .catch(errorWhile('updating email'))
                .catch(error => {
                    // todo: might need to reauthenticate
                    // todo: route to /auth/sign-in?action=reauthenticate
                    return Promise.reject(error)
                })
        }
        return Promise.reject({
            code: 'auth/null',
            message: 'No user signed in'
        })
    }
    updateUserPassword(password) {
        const user = this.currentUser
        if (user) {
            return user.updatePassword(password)
                .catch(errorWhile('updating password'))
                .catch(error => {
                    // todo: might need to reauthenticate
                    // todo: route to /auth/sign-in?action=reauthenticate
                    return Promise.reject(error)
                })
        }
        return Promise.reject({
            code: 'auth/null',
            message: 'No user signed in'
        })
    }
    sendPasswordResetEmail(email) {
        return firebase.auth().sendPasswordResetEmail(email)
            .catch(errorWhile('sending password reset email'))
    }
    verifyPasswordResetCode(code) {
        return firebase.auth().verifyPasswordResetCode(code)
            .catch(errorWhile('verifying password reset code'))
    }
    confirmPasswordReset(code, newPassword) {
        return firebase.auth().confirmPasswordReset(code, newPassword)
            .catch(errorWhile('confirming password reset'))
    }

    deleteUserAccount() {
        const user = this.currentUser
        if (user) {
            return user.delete()
                .catch(errorWhile('deleting user account'))
                .catch(error => {
                    // todo: might need to reauthenticate
                    // todo: route to /auth/sign-in?action=reauthenticate
                    return Promise.reject(error)
                })
        }
        return Promise.reject({
            code: 'auth/null',
            message: 'No user signed in'
        })
    }

    // Database --
}

const authChangedCallback = (user) => {
    console.log('Auth changed to', user)
    store.dispatch(AUTH_USER_CHANGED, user)
}
const authErrorCallback = (error) => {
    console.log('Auth error:', error)
    store.dispatch(AUTH_ERROR, error)
}

export default new FirebaseService({
    apiKey: 'AIzaSyBf_R63edemA5-TUQ5x0e1blXfPcrUtrL4',
    authDomain: 'secret-santa-e1f38.firebaseapp.com',
    databaseURL: 'https://secret-santa-e1f38.firebaseio.com',
    storageBucket: 'secret-santa-e1f38.appspot.com'
}, authChangedCallback, authErrorCallback)
