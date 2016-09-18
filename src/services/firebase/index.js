import firebase from './include'

export class FirebaseFeature {
    constructor(firebaseApp, featureName) {
        this.app = firebaseApp
        this.featureName = featureName
    }
}

/** Firebase interface, supporting auth, database and storage features */
class FirebaseService {
    /**
     * Create a FirebaseService object, initializing the Firebase application.
     * You'll then need to call FirebaseService.use
     * @param {Object} appConfig - The Firebase config object, passed to initializeApp
     * @param {string} appConfig.appName - The name of the Firebase app (optional, defaults to '[DEFAULT]')
     */
    constructor(appConfig) {
        this.config  = appConfig
        this.appName = appConfig.appName || '[DEFAULT]'
        this.app = firebase.initializeApp(this.config, this.appName)
        this.features = {
            auth: null,
            db: null,
            storage: null
        }
    }

    /**
     * Enable and configure a Firebase feature.
     * @param {FirebaseFeature} FeatureClass - Derived class of FirebaseFeature
     */
    use(FeatureClass, config = {}) {
        const feature = new FeatureClass(this.app, config)
        this.features[feature.featureName] = feature
    }

    // Quick access through getters
    get auth() {
        return this.features.auth
    }
    get db() {
        return this.features.db
    }
    get storage() {
        return this.features.storage
    }
}

export default new FirebaseService({
    apiKey: 'AIzaSyBf_R63edemA5-TUQ5x0e1blXfPcrUtrL4',
    authDomain: 'secret-santa-e1f38.firebaseapp.com',
    databaseURL: 'https://secret-santa-e1f38.firebaseio.com',
    storageBucket: 'secret-santa-e1f38.appspot.com',
    appName: 'Secret Santa'
})
