import { AUTH_ERROR } from '../../mutation-types'
import firebase from '../../../services/firebase'

export const registerWithEmail = (store, email, password) => {
    firebase.registerWithEmail(email, password)
        .catch(error => store.dispatch(AUTH_ERROR, error))
}
export const signInWithFacebook = (store) => {
    firebase.signInWithFacebook()
        .catch(error => store.dispatch(AUTH_ERROR, error))
}
export const signInWithEmail = (store, email, password) => {
    firebase.signInWithEmail(email, password)
        .catch(error => store.dispatch(AUTH_ERROR, error))
}
export const signOut = (store) => {
    firebase.signOut()
        .catch(error => store.dispatch(AUTH_ERROR, error))
}

export const updateUserProfile = (store, profile) => {
    firebase.updateUserProfile(profile)
        .catch(error => store.dispatch(AUTH_ERROR, error))
}
