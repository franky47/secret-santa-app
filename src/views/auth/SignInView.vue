<template>
    <div id='wrapper' class='ui very padded raised segment' :class='{loading: loading}'>
        <button @click='signInWithFacebook' class='ui fluid large facebook button'>
            <i class='facebook icon'></i>
            Sign in with Facebook
        </button>
        <div class='ui horizontal divider'>Or</div>
        <form @submit.prevent='signIn' class='ui form' :class='{error: errorMessage}'>
            <email :value.sync='user.email' :show-errors='showErrors' v-ref:email></email>
            <password :value.sync='user.password' :show-errors='showErrors' v-ref:password></password>
            <button class='ui fluid blue button' type='submit'>
                <i class='fitted icon sign in'></i> Sign In
            </button>
            <div class='ui error message'>
                <div class='header'>Error</div>
                <p>{{errorMessage}}</p>
            </div>
        </form>
        <div class='ui divider'></div>
        <div class='register'>
            <a href='#'>Create an account</a></p>
        </div>
    </div>
</template>

<script>
import Email from '../../components/form/Email'
import Password from '../../components/form/Password'
import { isSignedIn } from '../../vuex/modules/auth/getters'
import {
    signInWithFacebook,
    signInWithEmail,
    signOut
} from '../../vuex/modules/auth/actions'
import * as routes from '../../router/routes-definitions'

export default {
    data: () => ({
        user: {
            email: '',
            password: ''
        },
        loading: false,
        errorMessage: ''
    }),
    components: { Email, Password },
    methods: {
        signIn() {
            const email = this.user.email.trim()
            const password = this.user.password.trim()
            // todo: check route args to see if reauth or sign-in.
            this.signInWithEmail(email, password).then(() => {
                this.reset()
                const redirect = this.redirect
                if (redirect) {
                    this.$router.go({ path: redirect })
                } else {
                    this.$router.go(routes.home)
                }
            }).catch(error => {
                this.loading = false
                this.errorMessage = error.message
            })
            this.loading = true
        },
        reset() {
            this.errorMessage = ''
            this.user.email = ''
            this.user.password = ''
            this.loading = false
        }
    },
    watch: {
        isSignedIn(signedIn) {
            const redirect = this.redirect
            if (signedIn && redirect) {
                this.$router.go({ path: redirect })
            }
        }
    },
    vuex: {
        getters: {
            isSignedIn,
            redirect: state => state.route.query.then || null
        },
        actions: {
            signInWithFacebook,
            signInWithEmail,
            signOut
        }
    }
}
</script>

<style scoped>
#wrapper {
    max-width: 450px;
    min-width: 360px;
    margin: 130px auto;
    padding-bottom: 23px;
    background: #fafafa;
}
.register {
    text-align: center;
}
</style>