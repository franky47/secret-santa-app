import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import { isSignedIn } from '../vuex/modules/auth/getters'

// Import views
import HomeView                     from '../views/HomeView'
import ProfileView                  from '../views/ProfileView'
import RegisterView                 from '../views/auth/RegisterView'
import SignInView                   from '../views/auth/SignInView'
import PasswordResetRequestView     from '../views/auth/PasswordResetRequestView'
import PasswordResetChallengeView   from '../views/auth/PasswordResetChallengeView'

import * as routes from './routes-definitions'

Vue.use(VueRouter)

const router = new VueRouter({
    hashbang: false,
    history: true
})

router.map({
    [routes.home]: { component: HomeView },

    [routes.auth.register]:                 { component: RegisterView },
    [routes.auth.signIn]:                   { component: SignInView },
    [routes.auth.passwordReset.request]:    { component: PasswordResetRequestView },
    [routes.auth.passwordReset.challenge]:  { component: PasswordResetChallengeView },

    // Authenticated routes
    [routes.userProfile]: {
        component: ProfileView,
        auth: true
    }
})

router.beforeEach(transition => {
    const authenticated = isSignedIn(store.state)
    if (transition.to.auth && !authenticated) {
        transition.redirect({
            path: routes.auth.signIn,
            query: {
                next: transition.to.path
            }
        })
    } else {
        transition.next()
    }
})

export default router
