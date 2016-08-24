import firebase from './firebase-include'
import { FirebaseFeature } from './firebase'
import { errorWhile } from '../utility/utility'

export default class FirebaseAuthService extends FirebaseFeature {
    constructor(firebaseApp, config) {
        super(firebaseApp, 'auth')
        this.callbacks = config.callbacks
        this.unsubscribe = this.auth.onAuthStateChanged(this.callbacks.changed,
                                                        this.callbacks.error)
    }

    get auth() {
        return firebase.auth(this.app)
    }
    get currentUser() {
        return this.auth.currentUser
    }

    registerWithEmail(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password)
            .catch(errorWhile('registering new account'))
    }

    signInWithEmail(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
            .catch(errorWhile('signing in with email'))
    }
    signInWithFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider()
        provider.addScope('public_profile')
        return this.auth.signInWithRedirect(provider)
            .catch(errorWhile('signing in with Facebook'))
    }
    signOut() {
        return this.auth.signOut()
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
    getRedirectResult() {
        return this.auth.getRedirectResult()
            .catch(errorWhile('getting redirect result'))
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
        return this.auth.sendPasswordResetEmail(email)
            .catch(errorWhile('sending password reset email'))
    }
    verifyPasswordResetCode(code) {
        return this.auth.verifyPasswordResetCode(code)
            .catch(errorWhile('verifying password reset code'))
    }
    confirmPasswordReset(code, newPassword) {
        return this.auth.confirmPasswordReset(code, newPassword)
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
}
