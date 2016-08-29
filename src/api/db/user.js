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

export const create = (id, user = {}) => {
    const path = `/users/${id}`
    firebase.db.once(path).then(snapshot => {
        if (snapshot.val() === null) {
            return firebase.db.set(path, {
                displayName: user.displayName || null,
                photoURL:    user.photoURL || null
            })
        } else {
            return Promise.resolve() // Already exists
        }
    }).catch(errorWhile('creating user'))
}
export const update = (id, user) => {
    return firebase.db.update(`/users/${id}`, user)
}
