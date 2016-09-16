<template>
    <div class='ui segments'>
        <div class='ui red segment header'>
            <h4><i class='ui fitted warning sign icon'></i>Danger Zone</h4>
        </div>
        <div class='ui segment'>
            <form class='ui form' :class='{error: error}' @submit.prevent='submit'>
                <password :value.sync='password' label='Enter your password'></password>
                <button class='ui red button' :class='{loading: loading}' type='submit'>Delete your account</button>
            </form>
        </div>
        <div class='ui bottom attached error message' v-if='error'>
            <i class='fitted warning circle icon'></i> {{error}}
        </div>
    </div>
</template>

<script>
import Password from '../../../components/form/Password'
import { deleteUserAccount } from '../../../vuex/modules/auth/actions'

export default {
    data: () => ({
        password: '',
        loading: false,
        error: null
    }),
    components: { Password },
    methods: {
        submit() {
            this.loading = true
            this.deleteUserAccount(this.password)
            .then(() => {
                this.reset()
            })
            .catch(error => {
                this.loading = false
                this.error = error
            })
        },
        reset() {
            this.password   = ''
            this.loading    = false
            this.error      = null
        }
    },
    vuex: {
        actions: {
            deleteUserAccount
        }
    }
}
</script>
