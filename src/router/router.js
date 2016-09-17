import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import { isSignedIn } from '../vuex/modules/auth/getters'

// Import views
import HomeView                     from '../views/HomeView'
import SettingsView                 from '../views/SettingsView'
import   SettingsAccount            from '../views/settings/Account'
import   SettingsProfile            from '../views/settings/Profile'
import RegisterView                 from '../views/auth/RegisterView'
import SignInView                   from '../views/auth/SignInView'
import PasswordResetRequestView     from '../views/auth/PasswordResetRequestView'
import PasswordResetChallengeView   from '../views/auth/PasswordResetChallengeView'

import * as routes from './routes-definitions'

const unimplementedComponent = {
    template: `
    <div class=''>
        <h2 class='ui red header'><i class='fitted delete icon'></i>Unimplemented View</h2>
        <p>Please report this issue on <a href='https://github.com/Franky47/secret-santa-app/issues'>GitHub</a>,
        adding the following information to the issue description:</p>
        <pre class='ui secondary segment'>{{$route.query | json}}</pre>
    </div>
    `
}

Vue.use(VueRouter)

const router = new VueRouter({
    hashbang: false,
    history: true
})

router.map({
    [routes.home]: { component: HomeView },
    [routes.invalid]: { component: unimplementedComponent },
    [routes.auth.root]: {
        component: {
            template: '',
            route: {
                canActivate(transition) {
                    const mode = transition.to.query.mode || null
                    switch (mode) {
                    case 'verifyEmail':
                        transition.redirect(routes.auth.verifyEmail)
                        break
                    case 'resetPassword':
                        transition.redirect(routes.auth.passwordReset.challenge)
                        break
                    case 'resetEmail':
                        transition.redirect(routes.auth.resetEmail)
                        break
                    default:
                        const context = {
                            path:   transition.to.path,
                            query:  JSON.stringify(transition.to.query)
                        }
                        transition.redirect({
                            path:   routes.invalid,
                            query:  context
                        })
                        break
                    }
                }
            }
        }
    },
    [routes.auth.register]:                 { component: RegisterView },
    [routes.auth.signIn]:                   { component: SignInView },
    [routes.auth.verifyEmail]:              { component: unimplementedComponent },
    [routes.auth.resetEmail]:               { component: unimplementedComponent },
    [routes.auth.passwordReset.request]:    { component: PasswordResetRequestView },
    [routes.auth.passwordReset.challenge]:  { component: PasswordResetChallengeView },

    // Authenticated routes
    [routes.settings.root]: {
        component: SettingsView,
        auth: true,
        subRoutes: {
            [routes.settings.subRoutes.account]: { component: SettingsAccount },
            [routes.settings.subRoutes.profile]: { component: SettingsProfile }
        }
    }
})

router.redirect({
    '*': routes.home    // Unmatched routes go to home
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
