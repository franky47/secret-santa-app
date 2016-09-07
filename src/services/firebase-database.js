import firebase from './firebase-include'
import { FirebaseFeature } from './firebase'

export default class FirebaseDatabaseService extends FirebaseFeature {
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
    remove(path, data) {
        return this.db.ref(path).remove()
    }

    // Read --
    once(path) {
        return this.db.ref(path).once('value')
    }

    onValueChanged(path, callback) {
        const ref = this.db.ref(path)
        ref.on('value', callback)
        return () => {
            ref.off('value', callback)
        }
    }
    onChildAdded(path, callback) {
        const ref = this.db.ref(path)
        ref.on('child_added', callback)
        return () => {
            ref.off('child_added', callback)
        }
    }
    onChildRemoved(path, callback) {
        const ref = this.db.ref(path)
        ref.on('child_removed', callback)
        return () => {
            ref.off('child_removed', callback)
        }
    }
    onChildChanged(path, callback) {
        const ref = this.db.ref(path)
        ref.on('child_changed', callback)
        return () => {
            ref.off('child_changed', callback)
        }
    }
    onChildrenChanged(path, callback) {
        const offAdded   = this.onChildAdded(path, callback)
        const offRemoved = this.onChildRemoved(path, callback)
        const offChanged = this.onChildChanged(path, callback)
        return () => {
            offAdded()
            offRemoved()
            offChanged()
        }
    }
}
