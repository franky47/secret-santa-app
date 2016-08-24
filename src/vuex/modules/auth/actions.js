import {
    AUTH_SIGNED_IN,
    AUTH_SIGNED_OUT,
    AUTH_USER_CHANGED,
    AUTH_USER_UPDATED,
    AUTH_ERROR
} from '../../mutation-types'
import { isSignedIn } from './getters'
import firebase from '../../../services/firebase'

const dispatchAndChain = dispatch => error => {
    dispatch(AUTH_ERROR, error)
    return Promise.reject(error)
}

// --

export const registerWithEmail = ({dispatch}, email, password) => {
    return firebase.auth.registerWithEmail(email, password)
        .then(result => {
            dispatch(AUTH_SIGNED_IN)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}
export const signInWithFacebook = ({dispatch}) => {
    // Using redirect: don't mark as signed in yet, wait for completion.
    return firebase.auth.signInWithFacebook()
        .catch(dispatchAndChain(dispatch))
}
export const signInWithEmail = ({dispatch}, email, password) => {
    return firebase.auth.signInWithEmail(email, password)
        .then(result => {
            dispatch(AUTH_SIGNED_IN)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}
export const signOut = ({dispatch}) => {
    return firebase.auth.signOut()
        .then(result => {
            dispatch(AUTH_SIGNED_OUT)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}
export const updateUserProfile = ({dispatch}, profile) => {
    return firebase.auth.updateUserProfile(profile)
        .then(result => {
            // Update user info as it might not be notified by auth changed cbk
            dispatch(AUTH_USER_UPDATED, profile)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}
export const deleteAccount = ({dispatch}, profile) => {
    return firebase.auth.deleteUserAccount()
        .then(result => {
            dispatch(AUTH_SIGNED_OUT)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}

// ---

export const authChangedCallback = ({dispatch, state}, user) => {
    console.log('Auth changed to', user)
    dispatch(AUTH_USER_CHANGED, user)
    if (user && !isSignedIn(state)) {
        dispatch(AUTH_SIGNED_IN)
    }
}
export const authErrorCallback = ({dispatch}, error) => {
    console.log('Auth error:', error)
    dispatch(AUTH_ERROR, error)
}
