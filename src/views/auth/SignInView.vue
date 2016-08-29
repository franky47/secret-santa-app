<template>
    <div id='wrapper' class='ui very padded raised segment' :class='{loading: loading}'>
        <button @click='facebookSignIn' class='ui fluid large facebook button'>
            <i class='facebook icon'></i>
            {{ $t('auth.signInWithFacebook') }}
        </button>
        <div class='ui horizontal divider'>{{ $t('or') }}</div>
        <form @submit.prevent='emailSignIn' class='ui form' :class='{error: errorMessage}'>
            <email :value.sync='user.email' :show-errors='showErrors' v-ref:email></email>
            <password :value.sync='user.password' :show-errors='showErrors' v-ref:password></password>
            <button class='ui fluid blue button' type='submit'>
                <i class='fitted icon sign in'></i> {{ $t('auth.signIn') }}
            </button>
            <div class='field centered text padded'>
                <a v-link='{ path: routes.auth.passwordReset.request }'>
                    {{ $t('auth.forgotPassword') }}
                </a>
            </div>
            <div class='ui error message'>
                <div class='header'>Error</div>
                <p>{{errorMessage}}</p>
            </div>
        </form>
        <div class='ui divider'></div>
        <div class='centered text'>
            <a v-link='{ path: routes.auth.register }'>
                {{ $t('auth.register')}}
            </a>
        </div>
    </div>
</template>

<script>
import Email            from '../../components/form/Email'
import Password         from '../../components/form/Password'
import { isSignedIn }   from '../../vuex/modules/auth/getters'
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
        errorMessage: '',
        routes
    }),
    components: { Email, Password },
    methods: {
        facebookSignIn() {
            this.loading = true
            this.signInWithFacebook()
                .catch(error => {
                    this.loading = false
                    this.errorMessage = error.message
                })
        },
        emailSignIn() {
            const email = this.user.email.trim()
            const password = this.user.password.trim()
            // todo: check route args to see if reauth or sign-in.
            this.signInWithEmail(email, password).then(() => {
                this.reset()
                this.handleRedirect()
            }).catch(error => {
                this.loading = false
                this.errorMessage = error.message
            })
            this.loading = true
        },
        reset() {
            this.errorMessage   = ''
            this.user.email     = ''
            this.user.password  = ''
            this.loading        = false
        },
        handleRedirect() {
            const redirect = this.$router.query.next || null
            if (redirect) {
                this.$router.go({ path: redirect })
            } else {
                this.$router.go(routes.home)
            }
        }
    },
    created() {
        if (this.isSignedIn) {
            this.handleRedirect()
        }
    },
    watch: {
        isSignedIn(signedIn) {
            if (signedIn) {
                this.handleRedirect()
            }
        }
    },
    vuex: {
        getters: {
            isSignedIn
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
}
.centered.text {
    text-align: center;
}
.padded {
    padding-top: 12px;
}
</style>