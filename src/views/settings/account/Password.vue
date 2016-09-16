<template>
    <div class='ui segments'>
        <div class='ui secondary segment header'><h4><i class='ui fitted lock icon'></i>Change your password</h4></div>
        <div class='ui segment'>
            <form class='ui form' :class='{error: error}' @submit.prevent='update'>
                <password :value.sync='password.current' label='Current password'></password>
                <password :value.sync='password.updated' label='New password' ></password>
                <password :value.sync='password.confirm' label='Confirm new password' :matching='matching_passwords'></password>
                <button class='ui button' :class='{loading: loading}' type='submit'>Update password</button>
            </form>
        </div>
        <div class='ui bottom attached error message' v-if='error'>
            <i class='fitted warning circle icon'></i> {{error}}
        </div>
    </div>
</template>

<script>
import Password from '../../../components/form/Password'
import { updateUserPassword } from '../../../vuex/modules/auth/actions'

export default {
    data: () => ({
        password: {
            current: '',
            updated: '',
            confirm: ''
        },
        loading: false,
        error: null
    }),
    components: { Password },
    methods: {
        update() {
            if (!this.matching_passwords) {
                this.error = "Passwords don't match."
                return
            }
            this.loading = true
            this.updateUserPassword(this.password.current, this.password.updated)
            .then(() => {
                this.reset()
            })
            .catch(error => {
                this.loading = false
                this.error  = error
            })
        },
        reset() {
            this.password.current = ''
            this.password.updated = ''
            this.password.confirm = ''
            this.loading = false
            this.error = null
        }
    },
    computed: {
        matching_passwords() {
            const notEmpty = !!this.password.confirm.trim()
            const matching = this.password.updated === this.password.confirm
            return matching && notEmpty
        }
    },
    vuex: {
        actions: {
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
