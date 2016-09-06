export const users              = '/users'
export const user               = (uid) => `${users}/${uid}`
export const userPreferences = {
    root:       (uid) => `${user(uid)}/preferences`,
    locale:     (uid) => `${user(uid)}/preferences/locale`
}
