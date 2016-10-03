import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import { isSignedIn } from '../vuex/modules/auth/getters'

// Import views
import HomeView                     from '../views/HomeView'
import AboutView                    from '../views/About'
import Sandbox                      from '../views/Sandbox'
import SettingsView                 from '../views/SettingsView'
import   SettingsAccount            from '../views/settings/Account'
import   SettingsProfile            from '../views/settings/Profile'
import RegisterView                 from '../views/auth/RegisterView'
import SignInView                   from '../views/auth/SignInView'
import PasswordResetRequestView     from '../views/auth/PasswordResetRequestView'
import PasswordResetChallengeView   from '../views/auth/PasswordResetChallengeView'
import CreateGameView               from '../views/game/CreateGameView'

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
    history: true,
    routes: [
        { path: routes.home,    component: HomeView },
        { path: routes.about,   component: AboutView },
        { path: routes.sandbox, component: Sandbox },
        { path: routes.invalid, component: unimplementedComponent },
        {
            path: routes.auth.root,
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
        { path: routes.auth.register,                   component: RegisterView },
        { path: routes.auth.signIn,                     component: SignInView },
        { path: routes.auth.verifyEmail,                component: unimplementedComponent },
        { path: routes.auth.resetEmail,                 component: unimplementedComponent },
        { path: routes.auth.passwordReset.request,      component: PasswordResetRequestView },
        { path: routes.auth.passwordReset.challenge,    component: PasswordResetChallengeView },
        {
            path: routes.settings.root,
            component: SettingsView,
            auth: true,
            children: [
                { path: routes.settings.subRoutes.account, component: SettingsAccount },
                { path: routes.settings.subRoutes.profile, component: SettingsProfile }
            ]
        },

        {
            path: routes.games.create,
            component: CreateGameView,
            auth: true
        },

        // Catch-all redirects to home
        { path: '*',            redirect: routes.home },
        { path: '/register',    redirect: routes.auth.register },
        { path: '/sign-up',     redirect: routes.auth.register },
        { path: '/sign-in',     redirect: routes.auth.signIn },
        { path: '/login',       redirect: routes.auth.signIn }
    ]
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
