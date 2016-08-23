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
import { deleteAccount } from '../../vuex/modules/auth/actions'
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

            this.deleteAccount().then(() => {
                this.$router.go(routes.home)
            }).catch(error => {
                switch (error.code) {
                case 'auth/null':
                    this.$router.go({
                        path: routes.auth.signIn,
                        params: {
                            message: 'Please sign in again to continue'
                        },
                        query: {
                            redirect: routes.auth.profile
                        }
                    })
                    break
                case 'auth/requires-recent-login':
                    this.$router.go(routes.auth.reauthenticate)
                    break
                default:
                    // todo: display error code somewhere (toastr?)
                    break
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
            deleteAccount
        }
    }
}
</script>

<style scoped>
.test-transition {
    transition: all .8s ease;
}
</style>