import firebase from './firebase-include'
import { FirebaseFeature } from './firebase'

export class FirebaseStorageService extends FirebaseFeature {
    constructor(firebaseApp, config) {
        super(firebaseApp, 'storage')
    }
}
