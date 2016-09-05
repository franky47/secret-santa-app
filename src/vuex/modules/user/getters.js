export const getCurrentUserObject = state => state.user

export const getCurrentUser = {
    uid:            state => state.user.uid,
    email:          state => state.user.email,
    displayName:    state => state.user.displayName,
    photoURL:       state => state.user.photoURL
}

