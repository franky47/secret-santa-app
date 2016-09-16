<template>
    <div class='ui segments'>
        <div class='ui secondary segment header'>
            <h4><i class='ui fitted mail icon'></i>Change your email</h4>
        </div>
        <div class='ui segment'>
            <form class='ui form' :class='{error: error}' @submit.prevent='update'>
                <email :value.sync='email' v-ref:email></email>
                <password :value.sync='password' label='Enter your password'></password>
                <button class='ui button' :class='{loading: loading}' type='submit'>Update email</button>
            </form>
        </div>
        <div class='ui bottom attached error message' v-if='error'>
            <i class='fitted warning circle icon'></i> {{error}}
        </div>
    </div>
</template>

<script>
import Email from '../../../components/form/Email'
import Password from '../../../components/form/Password'
import { getCurrentUser } from '../../../vuex/modules/user/getters'
import { updateUserEmail } from '../../../vuex/modules/auth/actions'

export default {
    data: () => ({
        email: '',
        password: '',
        loading: false,
        error: null
    }),
    components: { Email, Password },
    methods: {
        update() {
            if (!this.email.trim()) {
                this.error = 'Please enter a valid email address.'
                return
            }
            this.loading = true
            this.updateUserEmail(this.email.trim(), this.password)
            .then(() => {
                this.reset()
            })
            .catch(error => {
                this.loading = false
                this.error = error
            })
        },
        reset() {
            this.email      = this.userEmail
            this.password   = ''
            this.loading    = false
            this.error      = null
        }
    },
    watch: {
        userEmail(value) {
            this.email = value
        }
    },
    route: {
        activate: function() {
            console.log('activate')
        },
        data: function() {
            console.log('data')
        }
    },
    vuex: {
        getters: {
            userEmail:  getCurrentUser.email
        },
        actions: {
            updateUserEmail
        }
    }
}
</script>
