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

Vue.use(VueRouter)

const router = new VueRouter({
    hashbang: false // use clean URLs
})

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

router.map({
    '/': {
        component: HomeView
    },

    '/auth/register': { component: RegisterView },
    '/auth/sign-in': { component: SignInView },
    '/auth/password-reset-request': { component: PasswordResetRequestView },
    '/auth/password-reset-challenge': { component: PasswordResetChallengeView },

    // Authenticated routes
    '/profile': {
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
