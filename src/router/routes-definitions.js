// List of available routes, by category:
// /                                Home page (generic information)
// /auth/register                   Create a new account based on email
// /auth/sign-in                    Sign in (with Facebook or email)
// /auth/password-reset-request     Displays the password reset request form (to send the email)
// /auth/password-reset-challenge   Displays the challenge (with the code from the reset email)

// Authenticated routes:
// /games               Displays the list of games for the current user
// /profile             Displays (and edit) the current user's profile.
// /games/:id           Displays the game :id

export const home = '/'

export const auth = {
    signIn:             '/auth/sign-in',
    reauthenticate:     '/auth/sign-in?action=reauthenticate',  // Helper for $router.go(), uses the sign-in route
    register:           '/auth/register',
    passwordReset: {
        request:        '/auth/password-reset/request',
        challenge:      '/auth/password-reset/challenge'
    }
}

export const userProfile = '/profile'
