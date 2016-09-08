export const users              = '/users'
export const user               = (uid) => `${users}/${uid}`
export const userPreferences = {
    root:       (uid) => `${user(uid)}/preferences`,
    locale:     (uid) => `${user(uid)}/preferences/locale`
}

export const online = {
    users:      '/online_users',
    user: {
        root:       (uid)       => `${online.users}/${uid}`,
        location:   (uid, loc)  => `${online.user.root(uid)}/${loc}`
    }
}
