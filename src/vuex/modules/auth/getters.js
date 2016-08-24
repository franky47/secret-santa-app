export const isSignedIn = state => state.auth.signedIn

export const getCurrentUserName = state => {
    const user = state.auth.user
    if (user) {
        return user.displayName || user.email || 'Anonymous'
    }
    return null
}
export const getCurrentUserPictureURL = state => {
    const user = state.auth.user
    if (user) {
        return state.auth.user.photoURL || 'http://gravatar.com/avatar?d=mm&s=100'
    }
    return null
}
