import firebase from './firebase-include'
import { FirebaseFeature } from './firebase'

export class FirebaseDatabaseService extends FirebaseFeature {
    constructor(firebaseApp, config) {
        super(firebaseApp, 'db')
    }
}
