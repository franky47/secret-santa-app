import firebase from '../../services/firebase'
import { errorWhile } from '../../utility/utility'
import * as paths from './paths'

export const filterUserInfo = input => {
    const keptKeys = ['uid', 'email', 'displayName', 'photoURL']
    const output = {}
    for (const key in input) {
        if (keptKeys.indexOf(key) < 0) {
            console.warn('The following key will be filtered out from user info:', key)
        } else {
            output[key] = input[key]
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
        console.log('Creating user ' + uid, data)
        return firebase.db.set(path, data)
    }).catch(errorWhile('creating user'))
}

export const updateUser = (uid, user) => {
    const data = filterUserInfo(user)
    console.log('Updating user', data)
    return firebase.db.update(paths.user(uid), data)
        .catch(errorWhile('updating user'))
}

export const watchUser = (uid, callback) => {
    return firebase.db.onValueChanged(paths.user(uid), callback)
}
