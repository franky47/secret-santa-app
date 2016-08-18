<template>
    <div class='wrapper'>
        <button @click='signInWithFacebook' class='ui fluid large facebook button'>
            <i class='facebook icon'></i>
            Sign in with Facebook
        </button>
        <div class='ui horizontal divider'>Or</div>
        <form @submit.prevent='signIn' class='ui form'>
            <div class='field' :class='{error: check(validation.email)}'>
                <label>E-mail</label>
                <input v-model='user.email' type='email' placeholder='santa.claus@xmas.com'>
            </div>
            <div class='field' :class='{error: check(validation.password)}'>
                <label>Password</label>
                <input v-model='user.password' type='password' placeholder='••••••••••••'>
            </div>
            <button class='ui fluid blue button' type='submit'>
                <i class='fitted icon sign in'></i> Sign In
            </button>
        </form>
        <div class='ui divider'></div>
        <div class='register'>
            <a href='#'>Create an account</a></p>
        </div>
    </div>
    <div>
        <button @click='signInWithFacebook'>Sign in with Facebook</button>
        <button @click='signOut'>Sign out</button>
        <div v-if='isSignedIn'>
            <p>{{ userName }} </p>
            <img :src='userPhoto'></img>
        </div>
    </div>
</template>

<script>
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
        }
    }),
    methods: {
        signIn() {
            const email = this.user.email.trim()
            const password = this.user.password.trim()
            this.signInWithEmail(email, password).then(() => {
                this.user.email = ''
                this.user.password = ''
            })
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
.wrapper {
    width: 300px;
    margin: 50px;
}
.register {
    text-align: center;
}
</style>