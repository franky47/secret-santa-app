import firebase from '../../services/firebase'
import * as paths from './paths'

export const uploadUserAvatar = (uid, blob) => {
    return firebase.storage.uploadFile(blob, paths.user.avatar(uid))
}
