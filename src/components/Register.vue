<template>
    <form @submit.prevent='register' class='ui form' :class='{loading: loading, error: errorMessage}'>
        <div class='field' :class='{error: check(validation.name)}'>
            <label>Name <span v-if='check(validation.name)'>cannot be empty</span></label>
            <input type='text' v-model='newUser.name' placeholder='Santa Claus'>
        </div>
        <div class='field' :class='{error: check(validation.email)}'>
            <label>E-mail <span v-if='check(validation.email)'>must be valid</span></label>
            <input v-model='newUser.email' type='email' placeholder='santa.claus@xmas.com'>
        </div>
        <div class='field' :class='{error: check(validation.password)}'>
            <label>Password (8 characters minimum)</label>
            <input v-model='newUser.password' type='password' placeholder='8 characters minimum'>
        </div>
        <div class='ui error message'>
            <div class='header'>Error</div>
            <p>{{errorMessage}}</p>
        </div>
        <button class='ui basic green button' type='submit'>
            <i class='fitted icons'>
                <i class='icon user'></i>
                <i class='corner add icon'></i>
            </i> Register
        </button>
    </form>
</template>

<script>
import {
    registerWithEmail,
    updateUserProfile
} from '../vuex/modules/auth/actions'
const emailRE = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
    data: () => ({
        displayErrors: false,
        loading: false,
        newUser: {
            name: '',
            email: '',
            password: ''
        },
        errorMessage: ''
    }),
    computed: {
        validation: function() {
            return {
                name: !!this.newUser.name.trim(),
                email: emailRE.test(this.newUser.email),
                password: this.newUser.password.trim().length >= 8
            }
        },
        isValid: function() {
            const validation = this.validation
            return Object.keys(validation).every((key) => validation[key])
        }
    },
    methods: {
        register() {
            if (!this.isValid) {
                this.displayErrors = true
                return
            }
            this.registerWithEmail(this.newUser.email, this.newUser.password)
                .then(() => {
                    const profile = { displayName: this.newUser.name }
                    return this.updateUserProfile(profile)
                }).then(() => { // success
                    this.loading = false
                    this.reset()
                }).catch((error) => { // failed
                    this.loading = false
                    this.errorMessage = error.message
                })
            this.loading = true
        },
        check(field) {
            return this.displayErrors && !field
        },
        reset() {
            this.displayErrors = false
            this.newUser.email = ''
            this.newUser.password = ''
            this.newUser.name = ''
            this.errorMessage = ''
        }
    },
    vuex: {
        actions: {
            registerWithEmail,
            updateUserProfile
        }
    }
}
</script>