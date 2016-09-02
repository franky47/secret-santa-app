import firebase from '../../services/firebase'
import { errorWhile } from '../../utility/utility'
import * as paths from './paths'

export const mock = {
    users: {
        'userId': {
            displayName: 'François Best',
            photoURL: 'http://placehold.it/100x100'
            // ...
        }
    }
}

export const createUser = (uid, user = {}) => {
    const path = paths.user(uid)
    return firebase.db.once(path).then(snapshot => {
        if (snapshot.val() !== null) {
            return Promise.resolve() // Already exists
        }
        return firebase.db.set(path, {
            displayName: user.displayName || null,
            photoURL:    user.photoURL    || null
        })
    }).catch(errorWhile('creating user'))
}

export const updateUser = (uid, user) => {
    return firebase.db.update(paths.user(uid), user)
        .catch(errorWhile('updating user'))
}

export const watchUser = (uid, callback) => {
    return firebase.db.onValueChanged(paths.user(uid), callback)
}
