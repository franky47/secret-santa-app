import mutations from './mutations'
import { isSignedIn } from './getters'
import firebase from '../../../services/firebase'
import { markUserAsOffline, filterUserInfo } from '../../../api/db/user'

const dispatchAndChain = dispatch => error => {
    dispatch(mutations.ERROR, error)
    return Promise.reject(error)
}

// --

/**
 * Creates a new account with the supplied email/password.
 * It will also sign in the newly created user, through the authChangedCallback.
 */
export const registerWithEmail = ({dispatch}, email, password) => {
    return firebase.auth.registerWithEmail(email, password)
        .catch(dispatchAndChain(dispatch))
}

/**
 * Start the Facebook sign-in redirect workflow.
 * After the app has restarted from redirection,
 * authChangedCallback will be called with the user information.
 */
export const signInWithFacebook = ({dispatch}) => {
    return firebase.auth.signInWithFacebook()
        .catch(dispatchAndChain(dispatch))
}

/**
 * Sign the user in using email/password credentials.
 * This will asyncly call authChangedCallback with the user information.
 */
export const signInWithEmail = ({dispatch}, email, password) => {
    return firebase.auth.signInWithEmail(email, password)
        .catch(dispatchAndChain(dispatch))
}

/**
 * Sign the current user out.
 * Before doing so, it marks the user as offline, as it requires valid auth to
 * update the database.
 * This will asyncly call authChangedCallback with null to mark sign out success.
 */
export const signOut = ({dispatch}) => {
    return new Promise((resolve, reject) => {
        // Mark current user as offline first (as it requires auth)
        const user = firebase.auth.currentUser
        if (user) {
            markUserAsOffline(user.uid)
                .then(result => resolve(result))
                .catch(error => reject(error))
        } else {
            resolve()
        }
    }).then(() => {
        return firebase.auth.signOut()
    }).catch(dispatchAndChain(dispatch))
}

/**
 * Update the user basic information in Firebase auth data.
 * This includes only displayName and photoURL.
 * Note: authChangedCallback would not be called directly by the Firebase API,
 * so in order to keep it as a single source of truth for user infomation (that
 * we will replicate to the database), we call it explicitly in case of success.
 */
export const updateUserProfile = ({dispatch, state}, profile) => {
    return firebase.auth.updateUserProfile(profile)
        .then(result => {
            authChangedCallback({dispatch, state}, result)
            return result
        })
        .catch(dispatchAndChain(dispatch))
}

/**
 * Update the email address for the current user.
 * This operation requires recent authentication, so we call reauthenticate
 * beforehand (hence the password requirement), then we do the update.
 * authChangedCallback will be called twice during the process, once with the
 * reauthentication result (which should not change anything, but not enforced),
 * then a second time, but still with the old email address. As we use
 * authChangedCallback as a source of truth, we need it to contain the right
 * email address the second time (rather than calling it manually a third time),
 * so we override the email address in the callback.
 */
export const updateUserEmail = ({dispatch}, email, password) => {
    return firebase.auth.reauthenticate(password)
        .then(() => {
            return firebase.auth.updateUserEmail(email)
        })
        .catch(dispatchAndChain(dispatch))
}

/**
 * Update the password for the current user.
 * This operation requires recent authentication, so we call reauthenticate
 * beforehand (hence the old password requirement), then we do the update.
 * authChangedCallback will be called twice during the process, once with the
 * reauthentication result (which should not change anything, but not enforced),
 * then with the updated info. As the password is not available in the received
 * information, only tokens should change in the payload.
 */
export const updateUserPassword = ({dispatch}, oldPassword, newPassword) => {
    return firebase.auth.reauthenticate(oldPassword)
        .then(() => {
            return firebase.auth.updateUserPassword(newPassword)
        })
        .catch(dispatchAndChain(dispatch))
}

/**
 * Start the password reset worflow.
 * This will send an email to the given address containing a link
 * to /auth/reset-password/challenge?oobCode=<code>
 */
export const sendPasswordResetEmail = ({dispatch}, email) => {
    return firebase.auth.sendPasswordResetEmail(email)
        .catch(dispatchAndChain(dispatch))
}

/**
 * Finalizes the password reset workflow.
 * It will check the code sent in the password reset email (embedded as a query
 * in the URL), then reset the password with the supplied password.
 * Note: it does not log the user in automatically.
 */
export const resetUserPassword = ({dispatch}, code, newPassword) => {
    let userEmail = null
    return firebase.auth.verifyPasswordResetCode(code)
        .then(email => {
            userEmail = email
            return firebase.auth.confirmPasswordReset(code, newPassword)
        })
        .then(() => userEmail) // Return the email address.
        .catch(dispatchAndChain(dispatch))
}

/**
 * Delete the current user account.
 * This will need to perform a few tasks in a specific order:
 * - Mark the user as offline in the database.
 * - Delete the user information in the database.
 * - Delete the auth account, which will trigger a sign out.
 * todo: Check authChangedCallback workflow here.
 */
export const deleteUserAccount = ({dispatch}, password) => {
    // todo: delete entries in the database as well..
    return firebase.auth.reauthenticate(password)
        .then(() => {
            return firebase.auth.deleteUserAccount()
        })
        .catch(dispatchAndChain(dispatch))
}

// ---

/**
 * Callback for Firebase auth operations.
 * When Firebase performs auth operations and the signed in user changes, This
 * callback is called with the user information, or null if the user signed out
 * or if there is no signed in user (when the app starts).
 * It is used as a the main endpoint for auth info.
 */
export const authChangedCallback = ({dispatch, state}, user) => {
    console.log('Auth changed to', filterUserInfo(user))

    if (user && !isSignedIn(state)) {
        dispatch(mutations.SIGNED_IN)
    }
    if (!user && isSignedIn(state)) {
        dispatch(mutations.SIGNED_OUT)
    }
    dispatch(mutations.USER_CHANGED, user)
}

/**
 * Callback for Firebase auth operation errors.
 * Called when ?
 * Also, might send mutations.ERROR twice, as most actions handle it with dispatchAndChain...
 */
export const authErrorCallback = ({dispatch}, error) => {
    console.log('Auth error:', error)
    dispatch(mutations.ERROR, error)
}
