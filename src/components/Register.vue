<template>
    <form @submit.prevent='register' class='ui form'>
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
        <button class='ui basic green button' type='submit'>
            <i class='fitted icons'>
                <i class='icon user'></i>
                <i class='corner add icon'></i>
            </i> Register
        </button>
    </form>
</template>

<script>
import { registerWithEmail } from '../vuex/modules/auth/actions'
const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
    data: () => ({
        displayErrors: false,
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
            if (this.isValid) {
                this.registerWithEmail(this.newUser.email,
                                       this.newUser.password)
                this.newUser.email = ''
                this.newUser.password = ''
            } else {
                this.displayErrors = true
            }
        },
        check(field) {
            return this.displayErrors && !field
        }
    },
    vuex: {
        actions: {
            registerWithEmail
        }
    }
}
</script>