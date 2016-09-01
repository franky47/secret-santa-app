import firebase from '../../services/firebase'
import { errorWhile } from '../../utility/utility'

export const mock = {
    users: {
        'userId': {
            displayName: 'François Best',
            photoURL: 'http://placehold.it/100x100'
            // ...
        }
    }
}

export const createUser = (id, user = {}) => {
    const path = `/users/${id}`
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

export const updateUser = (id, user) => {
    return firebase.db.update(`/users/${id}`, user)
        .catch(errorWhile('updating user'))
}
