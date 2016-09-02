export const isSignedIn = state => state.auth.signedIn

export const getCurrentUser = {
    uid:        state => state.auth.user.uid,
    name:       state => state.auth.user.name,
    email:      state => state.auth.user.email,
    photoURL:   state => state.auth.user.photoURL
}
