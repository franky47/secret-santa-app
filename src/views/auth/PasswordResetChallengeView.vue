<template>
    <div class='ui two column doubling grid'>
        <div class='ui centered column'>
            <div class='ui padded raised segment'>
                <h3>Reset your password</h3>
                <form class='ui form' @submit.prevent='submit' :class='{error: error, success: success}'>
                    <password :value.sync='password'></password>
                    <button class='ui fluid primary button' :class='{loading: loading}'>
                        <i class='fitted lock icon'></i>Reset password
                    </button>
                    <div class='ui error message'>
                        <div class='header'>Error</div>
                        <p>{{error}}</p>
                    </div>
                    <div class='ui success message'>
                        <div class='header'>Password was reset</div>
                        <p>{{success}}</p>
                        <p><a v-link='routes.auth.signIn'>
                            <i class='icon sign in'></i> {{ $t('auth.signIn') }}
                        </a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Password from '../../components/form/Password'
import { resetUserPassword } from '../../vuex/modules/auth/actions'
import * as routes from '../../router/routes-definitions'

export default {
    data: () => ({
        password: '',
        loading: false,
        error: null,
        success: null,
        routes
    }),
    components: { Password },
    methods: {
        submit() {
            const code = this.$route.query.oobCode || null
            this.loading = true
            this.resetUserPassword(code, this.password)
                .then(email => {
                    this.loading = false
                    this.success = `Password was successfully reset for ${email}.`
                    this.error   = null
                    this.password   = ''
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
            resetUserPassword
        }
    }
}
</script>
