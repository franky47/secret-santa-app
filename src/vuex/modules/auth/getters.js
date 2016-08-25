export const isSignedIn = state => state.auth.signedIn

export const getCurrentUser = {
    id:         state => state.auth.user.id,
    name:       state => state.auth.user.name,
    email:      state => state.auth.user.email,
    photoURL:   state => state.auth.user.photoURL
}
