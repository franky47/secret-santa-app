import { AUTH_ERROR } from '../../mutation-types'
import firebase from '../../../services/firebase'

const dispatchAndChain = dispatch => error => {
    dispatch(AUTH_ERROR, error)
    return Promise.reject(error)
}

// --

export const registerWithEmail = ({dispatch}, email, password) => {
    return firebase.registerWithEmail(email, password)
        .catch(dispatchAndChain(dispatch))
}
export const signInWithFacebook = ({dispatch}) => {
    return firebase.signInWithFacebook()
        .catch(dispatchAndChain(dispatch))
}
export const signInWithEmail = ({dispatch}, email, password) => {
    return firebase.signInWithEmail(email, password)
        .catch(dispatchAndChain(dispatch))
}
export const signOut = ({dispatch}) => {
    return firebase.signOut()
        .catch(dispatchAndChain(dispatch))
}
export const updateUserProfile = ({dispatch}, profile) => {
    return firebase.updateUserProfile(profile)
        .catch(dispatchAndChain(dispatch))
}
