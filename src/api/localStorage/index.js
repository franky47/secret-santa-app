
class LocalStorage {
    constructor(appKey) {
        this.appKey = appKey
        this.storage = window.localStorage
    }

    set(name, data) {
        const json = JSON.stringify(data)
        const key = this._getKey(name)
        this.storage.setItem(key, json)
    }
    get(name) {
        const key = this._getKey(name)
        const json = this.storage.getItem(key)
        return JSON.parse(json)
    }
    delete(name) {
        const key = this._getKey(name)
        this.storage.removeItem(key)
    }

    _getKey(name) {
        return `${this.appKey}_${name}`
    }
}

export default new LocalStorage('SecretSanta')
