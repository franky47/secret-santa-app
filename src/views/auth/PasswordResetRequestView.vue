<template>
    <div class='ui two column doubling grid'>
        <div class='ui centered column'>
            <div class='ui padded raised segment'>
                <h3>Reset your password</h3>
                <form class='ui form' @submit.prevent='submit' :class='{error: error, success: success}'>
                    <email :value.sync='email'></email>
                    <button class='ui fluid primary button' :class='{loading: loading}'>
                        <i class='fitted mail icon'></i>Send password reset email
                    </button>
                    <div class='ui error message'>
                        <div class='header'>Error</div>
                        <p>{{error}}</p>
                    </div>
                    <div class='ui success message'>
                        <div class='header'>Email sent</div>
                        <p>{{success}}</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Email from '../../components/form/Email'
import { sendPasswordResetEmail } from '../../vuex/modules/auth/actions'

export default {
    data: () => ({
        email: '',
        loading: false,
        error: null,
        success: null
    }),
    components: { Email },
    methods: {
        submit() {
            this.loading = true
            this.sendPasswordResetEmail(this.email.trim())
                .then(() => {
                    this.loading = false
                    this.success = `Password reset email sent successfully to ${this.email}, check your inbox.`
                    this.error   = null
                    this.email   = ''
                })
                .catch(error => {
                    this.loading = false
                    this.error   = error
                    this.success = null
                })
        }
    },
    vuex: {
        actions: {
            sendPasswordResetEmail
        }
    }
}
</script>
