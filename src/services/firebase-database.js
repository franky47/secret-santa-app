import firebase from './firebase-include'
import { FirebaseFeature } from './firebase'

export class FirebaseDatabaseService extends FirebaseFeature {
    constructor(firebaseApp, config) {
        super(firebaseApp, 'db')
        this.db = firebase.database(this.app)
    }

    // Write --
    set(path, data) {
        return this.db.ref(path).set(data)
    }
    push(path, data) {
        return this.db.ref(path).push(data)
    }
    update(path, data) {
        return this.db.ref(path).update(data)
    }

    // Read --
    once(path) {
        return this.db.ref(path).once('value')
    }
}
