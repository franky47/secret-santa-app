// Error handler to use in Promise.catch
export const errorWhile = (context, keyword = 'while') => (error) => {
    console.log(`Error caught ${keyword} ${context}:`, error)
    return Promise.reject(error) // Allow chaining of error handlers
}
