import uuid from 'uuid'

// Error handler to use in Promise.catch
export const errorWhile = (context, keyword = 'while') => (error) => {
    console.log(`Error caught ${keyword} ${context}:`, error)
    return Promise.reject(error) // Allow chaining of error handlers
}

export const override = (dst, src) => {
    if (src === null || JSON.stringify(src) === '{}') {
        return dst // Nothing to change
    }
    if (dst === null || JSON.stringify(dst) === '{}') {
        return dst // No keys to override
    }
    for (const key of Object.keys(src)) {
        if (key in dst) {
            dst[key] = src[key]
        }
    }
    return dst
}

// From http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
export const hash = (str) => {
    let h = 0
    for (const i in str) {
        const c = str.charCodeAt(i)
        h = ((h << 5) - h) + c
        h |= 0 // Convert to 32bit integer
    }
    return h
}

class Fingerprint {
    constructor() {
        this.userAgent  = window.navigator.userAgent
        this.uuid       = uuid.v4()
        this.timestamp  = new Date().getTime()
    }

    asNumber() {
        return hash(this.userAgent + this.uuid + this.timestamp)
    }
}

export const fingerprint = new Fingerprint()
