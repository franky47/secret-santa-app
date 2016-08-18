export function isSignedIn(state) {
    return state.auth.user !== null
}
export function getCurrentUserName(state) {
    if (isSignedIn(state)) {
        return state.auth.user.displayName
    }
    return null
}
export function getCurrentUserPictureURL(state) {
    if (isSignedIn(state)) {
        return state.auth.user.photoURL
    }
    return null
}
