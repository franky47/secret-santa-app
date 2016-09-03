<template>
    <div class='field'>
        <label>Delete your account</label>
        <button class='ui red button'
            @click.prevent.stop='clicked'
            :class='{loading: loading, basic:confirming}'
            transition='test'
        >
            <i class='ui icon {{icon}}'></i> {{text}}
        </div>
    </div>
</template>

<script>
import * as auth from '../../vuex/modules/auth'
import * as routes from '../../router/routes-definitions'

export default {
    data: () => ({
        confirming: false,
        loading: false,
        text: 'Delete My Account',
        icon: 'trash'
    }),
    methods: {
        clicked() {
            if (!this.confirming) {
                this.confirming = true
                setTimeout(() => {
                    this.confirming = false
                }, 3000)
                return
            }
            this.deleteAccount().catch(error => {
                switch (error.code) {
                case 'auth/null':
                case 'auth/requires-recent-login':
                    this.reauthenticate()
                    break
                default:
                    // todo: display error code somewhere (toastr?)
                    break
                }
            })
        },
        reauthenticate() {
            this.$router.go({
                path: routes.auth.signIn,
                query: {
                    message: 'Please sign in again to continue',
                    next: this.$route.path
                }
            })
        }
    },
    computed: {
        text() {
            return this.confirming ? 'Are you sure ? ' : 'Delete My Account'
        },
        icon() {
            return this.confirming ? 'remove user' : 'trash'
        }
    },
    vuex: {
        actions: {
            deleteAccount: auth.actions.deleteAccount
        }
    }
}
</script>

<style scoped>
.test-transition {
    transition: all .8s ease;
}
</style>