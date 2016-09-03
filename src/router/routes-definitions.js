const populateSubRoutes = obj => {
    for (const sub in obj.subRoutes) {
        obj[sub] = obj.root + obj.subRoutes[sub]
    }
    return obj
}

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

export const settings = populateSubRoutes({
    root: '/settings',
    subRoutes: {
        account: '/account',
        profile: '/profile'
    }
})
