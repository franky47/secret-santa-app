import firebase from './firebase-include'
import { FirebaseFeature } from './firebase'

export default class FirebaseStorageService extends FirebaseFeature {
    constructor(firebaseApp, config) {
        super(firebaseApp, 'storage')
        this.storage = firebase.storage(this.app)
        this.root = this.storage.ref()
        this.uploadTasks = new Map()
    }

    /**
     * Start uploading a file to the given path.
     * @param {any} file - Data to upload.
     * @param {string} path - Full path to the file to upload, including file name and extension
     * @returns {UploadTask} - Firebase UploadTask, Promise-like, resolving to a snapshot or rejected with an error.
     */
    uploadFile(file, path) {
        const ref = this.root.child(path)
        const task = ref.put(file)
        if (path in this.uploadTasks) {
            this.handleSettledTask(path)
        }
        this.uploadTasks[path] = {
            task,
            unregisterListener: () => {}
        }
        return task
            .then(result => {
                this.handleSettledTask(path)
                return result
            })
            .catch(error => {
                this.handleSettledTask(path)
                return Promise.reject(error)
            })
    }

    /**
     * Attach a callback to be given information about an upload.
     * To monitor success/failure, you should use .then/.catch on the upload task.
     * @callback
     * @param {uploadInfoCallback} - Function to call when upload progress changes
     */
    attachInfoListener(task, info = (info) => {}) {
        const unregister = task.on(firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => info(Object.assign, snapshot, {
                progress: snapshot.bytesTransferred / snapshot.totalBytes
            })
        )
        this.uploadTasks[task.fullPath].unregisterListener = unregister
    }

    /**
     * Internal callback, unregisters listeners when a task is complete or has failed.
     */
    handleSettledTask(path) {
        if (this.uploadTasks.has(path)) {
            const task = this.uploadTasks[path]
            task.unregisterListener()
        }
    }
}

/**
 * This callback is displayed as a global member.
 * @callback uploadInfoCallback
 * @param {Object} info - Information about the upload. Inherits Firebase's UploadTaskSnapshot
 * @param {Number} info.progress - Upload progress as a float value between 0 and 1.
 */
