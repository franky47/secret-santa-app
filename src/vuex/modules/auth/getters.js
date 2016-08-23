export function isSignedIn(state) {
    return state.auth.signedIn
}
export function getCurrentUserName(state) {
    const user = state.auth.user
    if (user) {
        return user.displayName || user.email || 'Anonymous'
    }
    return null
}
export function getCurrentUserPictureURL(state) {
    const user = state.auth.user
    if (user) {
        return state.auth.user.photoURL || 'http://gravatar.com/avatar?d=mm&s=100'
    }
    return null
}
