import {
    AUTH_SIGNED_IN,
    AUTH_SIGNED_OUT,
    AUTH_USER_UPDATED,
    AUTH_ERROR
} from '../../mutation-types'
import firebase from '../../../services/firebase'

const dispatchAndChain = dispatch => error => {
    dispatch(AUTH_ERROR, error)
    return Promise.reject(error)
}

// --

export const registerWithEmail = ({dispatch}, email, password) => {
    return firebase.registerWithEmail(email, password)
        .then(() => {
            dispatch(AUTH_SIGNED_IN)
        })
        .catch(dispatchAndChain(dispatch))
}
export const signInWithFacebook = ({dispatch}) => {
    // Using redirect: don't mark as signed in yet, wait for completion.
    return firebase.signInWithFacebook()
        .catch(dispatchAndChain(dispatch))
}
export const signInWithEmail = ({dispatch}, email, password) => {
    return firebase.signInWithEmail(email, password)
        .then(() => {
            dispatch(AUTH_SIGNED_IN)
        })
        .catch(dispatchAndChain(dispatch))
}
export const signOut = ({dispatch}) => {
    return firebase.signOut()
        .then(() => {
            dispatch(AUTH_SIGNED_OUT)
        })
        .catch(dispatchAndChain(dispatch))
}
export const updateUserProfile = ({dispatch}, profile) => {
    return firebase.updateUserProfile(profile)
        .then(() => {
            // Update user info as it might not be notified by auth changed cbk
            dispatch(AUTH_USER_UPDATED, profile)
        })
        .catch(dispatchAndChain(dispatch))
}
export const deleteAccount = ({dispatch}, profile) => {
    return firebase.deleteUserAccount()
        .then(() => {
            dispatch(AUTH_SIGNED_OUT)
        })
        .catch(dispatchAndChain(dispatch))
}
