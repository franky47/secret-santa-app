import firebase from './firebase'

class ObserverBase {
    /**
     * Create an Observer
     * @param {methodResolver} - Function resolving to a Firebase database method.
     * This is needed to let the database initialize, and will be bound & resolved
     * when starting the observer (the database will have to be ready at that point).
     */
    constructor(methodResolver) {
        this.unregister     = () => {}
        this.methodResolver = methodResolver
        this.firebaseMethod = null
    }
    initialize() {
        if (!this.firebaseMethod) {
            this.firebaseMethod = this.methodResolver()
        }
    }
    start(path, callback) {
        this.initialize()
        this.unregister()
        this.unregister = this.firebaseMethod(path, snapshot => {
            callback(snapshot.val())
        })
    }
    stop() {
        this.unregister()
        this.unregister = () => {}
    }
}

export class ValueChangedObserver extends ObserverBase {
    constructor() {
        super(() => firebase.db.onValueChanged.bind(firebase.db))
    }
}

export class TreeObserver extends ObserverBase {
    constructor() {
        super(() => firebase.db.onChildrenChanged.bind(firebase.db))
    }
}
