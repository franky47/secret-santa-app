import firebase from '../../services/firebase'
import { errorWhile, fingerprint } from '../../utility'
import * as paths from './paths'

export const filterUserInfo = input => {
    if (input === null) {
        return null
    }

    const keptKeys = ['email', 'displayName', 'photoURL']
    const output = {}
    for (const key in input) {
        if (keptKeys.indexOf(key) !== -1) {
            output[key] = input[key]
        } else {
            // console.warn('The following key will be filtered out from user info:', key)
        }
    }
    return output
}

export const createUser = (uid, user = {}) => {
    const path = paths.user(uid)
    return firebase.db.once(path).then(snapshot => {
        if (snapshot.val() !== null) {
            return Promise.resolve() // Already exists
        }
        const data = filterUserInfo(user)
        return firebase.db.set(path, data)
    }).catch(errorWhile('creating user'))
}

export const updateUser = (uid, user) => {
    const data = filterUserInfo(user)
    return firebase.db.update(paths.user(uid), data)
        .catch(errorWhile('updating user'))
}

export const markUserAsOnline = (uid) => {
    const path = paths.online.user.location(uid, fingerprint.asNumber())
    firebase.db.onDisconnect(path).remove()
    return firebase.db.set(path, firebase.db.timestamp)
        .catch(errorWhile('marking user as online'))
}

export const markUserAsOffline = (uid) => {
    const path = paths.online.user.location(uid, fingerprint.asNumber())
    return firebase.db.remove(path)
        .catch(errorWhile('marking user as offline'))
}
