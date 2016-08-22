<template>
    <div id='wrapper' class='ui very padded raised secondary segment' :class='{loading: loading}'>
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
import Email from './form/Email'
import Password from './form/Password'
import {
    isSignedIn,
    getCurrentUserName,
    getCurrentUserPictureURL
} from '../vuex/modules/auth/getters'

import {
    signInWithFacebook,
    signInWithEmail,
    signOut
} from '../vuex/modules/auth/actions'

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
                // todo: connect with router to redirect to target
                this.reset()
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
    vuex: {
        getters: {
            isSignedIn,
            userName: getCurrentUserName,
            userPhoto: getCurrentUserPictureURL
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
    padding-bottom: 23px;
    background: #F8F8F8;
}
.register {
    text-align: center;
}
</style>