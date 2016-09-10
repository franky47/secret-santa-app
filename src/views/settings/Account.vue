<template>
    <h2>Manage your account</h2>
    <div class='ui segments'>
        <div class='ui secondary segment header'><h4><i class='ui fitted mail icon'></i>Change your email</h4></div>
        <div class='ui segment'>
            <form class='ui form' :class='{error: errors.email}' @submit.prevent='updateEmail'>
                <email :value.sync='email' v-ref:email></email>
                <password :value.sync='password.current' label='Enter your password' placeholder=''></password>
                <button class='ui button' :class='{loading: loading.email}' type='submit'>Update email</button>
            </form>
        </div>
        <div class='ui bottom attached error message' v-if='errors.email'>
            <i class='fitted warning circle icon'></i> {{errors.email}}
        </div>
    </div>
    <div class='ui segments'>
        <div class='ui secondary segment header'><h4><i class='ui fitted lock icon'></i>Change your password</h4></div>
        <div class='ui segment'>
            <form class='ui form' :class='{error: errors.password}' @submit.prevent='updatePassword'>
                <password :value.sync='password.current' label='Current password' placeholder=''></password>
                <password :value.sync='password.updated' label='New password' placeholder=''></password>
                <password :value.sync='password.confirm' label='Confirm new password' placeholder='' :matching='matching_passwords'></password>
                <button class='ui button' :class='{loading: loading.password}' type='submit'>Update password</button>
            </form>
        </div>
        <div class='ui bottom attached error message' v-if='errors.password'>
            <i class='fitted warning circle icon'></i> {{errors.password}}
        </div>
    </div>
    <div class='ui segments'>
        <div class='ui red segment header'>
            <h4><i class='ui fitted warning sign icon'></i>Danger Zone</h4>
        </div>
        <div class='ui segment'>
            <delete-account-button></delete-account-button>
        </div>
        <div class='ui bottom attached error message' v-if='errors.deleteAccount'>
            <i class='fitted warning circle icon'></i> {{errors.deleteAccount}}
        </div>
    </div>
</template>

<script>
import Email    from '../../components/form/Email'
import Password from '../../components/form/Password'
import DeleteAccountButton from '../../components/form/DeleteAccountButton'
import { getCurrentUser } from '../../vuex/modules/user/getters'
import {
    updateUserEmail,
    updateUserPassword
} from '../../vuex/modules/auth/actions'

export default {
    data: () => ({
        email: '',
        password: {
            current: '',
            updated: '',
            confirm: ''
        },
        loading: {
            email: false,
            password: false
        },
        errors: {
            email: null,
            password: null,
            deleteAccount: null
        }
    }),
    components: { Email, Password, DeleteAccountButton },
    methods: {
        updateEmail() {
            if (!this.email.trim()) {
                this.errors.email = 'Please enter a valid email address.'
                return
            }
            this.loading.email = true
            this.updateUserEmail(this.email.trim(), this.password.current)
            .then(() => {
                this.loading.email = false
                this.errors.email  = null
            })
            .catch(error => {
                this.loading.email = false
                this.errors.email  = error
                this.resetEmail()
            })
        },
        updatePassword() {
            if (!this.matching_passwords) {
                this.errors.password = "Passwords don't match."
                return
            }
            this.loading.password = true
            this.updateUserPassword(this.password.current, this.password.updated)
            .then(() => {
                this.loading.password = false
                this.errors.password  = null
                this.resetPasswords()
            })
            .catch(error => {
                this.loading.password = false
                this.errors.password  = error
            })
        },
        resetEmail() {
            this.email = this.userEmail
        },
        resetPasswords() {
            this.password.current = ''
            this.password.updated = ''
            this.password.confirm = ''
        }
    },
    computed: {
        matching_passwords() {
            const notEmpty = !!this.password.confirm.trim()
            const matching = this.password.updated === this.password.confirm
            return matching && notEmpty
        }
    },
    watch: {
        userEmail(value) {
            this.email = value
        }
    },
    vuex: {
        getters: {
            userEmail:  getCurrentUser.email
        },
        actions: {
            updateUserEmail,
            updateUserPassword
        }
    }
}
</script>

<style>
.focus.matching {
    border-color: green;
}
</style>
