export function isSignedIn(state) {
    return state.auth.user !== null
}
export function getCurrentUserName(state) {
    if (isSignedIn(state)) {
        const user = state.auth.user
        return user.displayName || user.email
    }
    return null
}
export function getCurrentUserPictureURL(state) {
    if (isSignedIn(state)) {
        return state.auth.user.photoURL || 'http://gravatar.com/avatar?d=mm&s=100'
    }
    return null
}
