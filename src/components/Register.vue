<template>
    <h2>Sign up</h2>
    <form id='signup' @submit.prevent='signup'>
        <input v-model='newUser.name' placeholder='Name'>
        <input v-model='newUser.email' placeholder='E-mail' type='email'>
        <input v-model='newUser.password' placeholder='Password' type='password'>
        <input type='submit' value='Sign up'>
    </form>
    <ul class="errors">
        <li v-show="!validation.name">Name cannot be empty.</li>
        <li v-show="!validation.email">Please provide a valid email address.</li>
        <li v-show="!validation.password">Password cannot be empty.</li>
    </ul>
</template>

<script>
import { registerWithEmail } from '../vuex/modules/auth/actions'
const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
    data: () => ({
        newUser: {
            name: '',
            email: '',
            password: ''
        }
    }),
    computed: {
        validation: function() {
            return {
                name: !!this.newUser.name.trim(),
                email: emailRE.test(this.newUser.email),
                password: !!this.newUser.password.trim()
            }
        },
        isValid: function() {
            const validation = this.validation
            return Object.keys(validation).every((key) => validation[key])
        }
    },
    methods: {
        signup() {
            if (this.isValid) {
                this.registerWithEmail(this.newUser.email,
                                       this.newUser.password)
                this.newUser.email = ''
                this.newUser.password = ''
            }
        }
    },
    vuex: {
        actions: {
            registerWithEmail
        }
    }
}
</script>