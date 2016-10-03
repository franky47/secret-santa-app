const populateSubRoutes = obj => {
    for (const sub in obj.subRoutes) {
        obj[sub] = `${obj.root}/${obj.subRoutes[sub]}`
    }
    return obj
}

export const home       = '/'
export const sandbox    = '/sandbox'
export const about      = '/about'
export const invalid    = '/invalid'

export const auth = {
    root:               '/auth',
    signIn:             '/auth/sign-in',
    verifyEmail:        '/auth/verify-email',
    resetEmail:         '/auth/reset-email',
    register:           '/auth/register',
    passwordReset: {
        request:        '/auth/password-reset/request',
        challenge:      '/auth/password-reset/challenge'
    }
}

export const settings = populateSubRoutes({
    root: '/settings',
    subRoutes: {
        account: 'account',
        profile: 'profile'
    }
})

export const games = populateSubRoutes({
    root: '/games',
    subRoutes: {
        create: 'create',
        id:     ':id'
    }
})
