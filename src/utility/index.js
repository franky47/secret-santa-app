// Error handler to use in Promise.catch
export const errorWhile = (context, keyword = 'while') => (error) => {
    console.log(`Error caught ${keyword} ${context}:`, error)
    return Promise.reject(error) // Allow chaining of error handlers
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
