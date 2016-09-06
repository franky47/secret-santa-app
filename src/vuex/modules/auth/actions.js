import mutations from './mutations'
import userMutations from '../user/mutations'
import { isSignedIn } from './getters'
import firebase from '../../../services/firebase'

const dispatchAndChain = dispatch => error => {
    dispatch(mutations.ERROR, error)
    return Promise.reject(error)
}

// --

export const registerWithEmail = ({dispatch}, email, password) => {
    return firebase.auth.registerWithEmail(email, password)
        .catch(dispatchAndChain(dispatch))
}
export const signInWithFacebook = ({dispatch}) => {
    return firebase.auth.signInWithFacebook()
        .catch(dispatchAndChain(dispatch))
}
export const signInWithEmail = ({dispatch}, email, password) => {
    return firebase.auth.signInWithEmail(email, password)
        .catch(dispatchAndChain(dispatch))
}
export const signOut = ({dispatch}) => {
    return firebase.auth.signOut()
        .catch(dispatchAndChain(dispatch))
}
export const updateUserProfile = ({dispatch}, profile) => {
    const user = firebase.auth.currentUser
    return firebase.auth.updateUserProfile(profile)
        .then(result => {
            dispatch(userMutations.CHANGED, user)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}
export const deleteAccount = ({dispatch}) => {
    return firebase.auth.deleteUserAccount()
        .catch(dispatchAndChain(dispatch))
}

// ---

export const authChangedCallback = ({dispatch, state}, user) => {
    console.log('Auth changed to', user)
    if (user && !isSignedIn(state)) {
        dispatch(mutations.SIGNED_IN)
    }
    if (!user && isSignedIn(state)) {
        dispatch(mutations.SIGNED_OUT)
    }
    dispatch(mutations.USER_CHANGED, user)
}
export const authErrorCallback = ({dispatch}, error) => {
    console.log('Auth error:', error)
    dispatch(mutations.ERROR, error)
}
