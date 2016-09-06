import firebase from './firebase'

export class ValueChangedObserver {
    constructor() {
        this.unregister = () => {}
    }
    start(path, callback, initData = null) {
        this.unregister()
        this.unregister = firebase.db.onValueChanged(path, snapshot => {
            callback(snapshot.val())
        })
    }
    stop() {
        this.unregister()
        this.unregister = () => {}
    }
}
