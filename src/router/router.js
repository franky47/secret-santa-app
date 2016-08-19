import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'

// Import views
import HomeView from './views/HomeView'
import ProfileView from './views/ProfileView'
import RegisterView from './views/auth/RegisterView'
import SignInView from './views/auth/SignInView'
import PasswordResetRequestView from './views/auth/PasswordResetRequestView'
import PasswordResetChallengeView from './views/auth/PasswordResetChallengeView'

import * as routes from './routes-definitions'

Vue.use(VueRouter)

const router = new VueRouter({
    hashbang: false // use clean URLs
})

router.map({
    [routes.home]: { component: HomeView },

    [routes.auth.register]: { component: RegisterView },
    [routes.auth.signIn]:   { component: SignInView },
    [routes.auth.passwordReset.request]: { component: PasswordResetRequestView },
    [routes.auth.passwordReset.challenge]: { component: PasswordResetChallengeView },

    // Authenticated routes
    [routes.userProfile]: {
        component: ProfileView,
        auth: true
    }
})

router.beforeEach(transition => {
    const authenticated = store.state.auth.user !== null
    if (transition.to.auth && !authenticated) {
        transition.redirect('/auth/sign-in')
    } else {
        transition.next()
    }
})

// todo: start the router

export default router
