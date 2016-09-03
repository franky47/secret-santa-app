import mutations from './mutations'
import { isSignedIn } from './getters'
import firebase from '../../../services/firebase'
import * as db from '../../../api/db/user'

const dispatchAndChain = dispatch => error => {
    dispatch(mutations.ERROR, error)
    return Promise.reject(error)
}

// --

export const registerWithEmail = ({dispatch}, email, password) => {
    return firebase.auth.registerWithEmail(email, password)
        .then(result => {
            dispatch(mutations.SIGNED_IN)
            db.createUser(result.uid, result)
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
            dispatch(mutations.SIGNED_IN)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}
export const signOut = ({dispatch}) => {
    return firebase.auth.signOut()
        .then(result => {
            dispatch(mutations.SIGNED_OUT)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}
export const updateUserProfile = ({dispatch}, profile) => {
    const user = firebase.auth.currentUser
    return Promise.all([
        firebase.auth.updateUserProfile(profile),
        db.updateUser(user.uid, profile)
    ]).then(result => {
        dispatch(mutations.USER_CHANGED, user)
        return result
    })
    .catch(dispatchAndChain(dispatch))
}
export const deleteAccount = ({dispatch}, profile) => {
    return firebase.auth.deleteUserAccount()
        .then(result => {
            dispatch(mutations.SIGNED_OUT)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}

// ---

export const authChangedCallback = ({dispatch, state}, user) => {
    console.log('Auth changed to', user)
    dispatch(mutations.USER_CHANGED, user)
    if (user && !isSignedIn(state)) {
        dispatch(mutations.SIGNED_IN)
    }
}
export const authErrorCallback = ({dispatch}, error) => {
    console.log('Auth error:', error)
    dispatch(mutations.ERROR, error)
}
