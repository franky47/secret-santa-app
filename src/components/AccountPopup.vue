<template>
    <div class='account popup' v-on-clickaway='open=false'>
        <div class='ui center aligned segment'>
            <img class='ui circular centered image pointer' :src='userPhoto' @click.stop='goToProfile'>
            <div class='ui header pointer' @click.stop='goToProfile'>{{userName}}
                <div class='sub header pointer'>{{userEmail}}</div>
            </div>
            <div class='ui primary basic fluid button' @click.stop='goToAccount'>
                <i class='fitted user icon'></i>
                {{ $t('settings.my') + ' ' + $t('settings.account')}}
            </div>
            <div class='ui divider'></div>
            <a @click='triggerSignOut'>
                <i class='ui fitted sign out icon'></i>
                {{ $t('auth.signOut') }}
            </a>
        </div>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { isSignedIn } from '../vuex/modules/auth/getters'
import { getCurrentUser } from '../vuex/modules/user/getters'
import { signOut } from '../vuex/modules/auth/actions'
import * as routes from '../router/routes-definitions'

export default {
    data: () => ({
    }),
    props: {
        open: {
            type: Boolean,
            twoWay: true
        }
    },
    mixins: [ clickaway ],
    methods: {
        goToAccount() {
            this.$router.go(routes.settings.account)
            this.dismiss()
        },
        goToProfile() {
            this.$router.go(routes.settings.profile)
            this.dismiss()
        },
        triggerSignOut() {
            this.signOut().then(() => {
                this.dismiss()
                this.$router.go(routes.home)
            })
        },
        dismiss() {
            this.open = false
        }
    },
    vuex: {
        getters: {
            isSignedIn,
            userEmail: getCurrentUser.email,
            userName:  getCurrentUser.displayName,
            userPhoto: getCurrentUser.photoURL
        },
        actions: {
            signOut
        }
    }
}
</script>
<style scoped>
.ui.header {
    margin-top: calc(1rem - 0.14285em);
}
.account.popup {
    position: absolute;
    top: 45px;
    right: 0;
    min-width: 250px;
}
@media only screen and (max-width: 768px) {
    .account.popup {
        right: 5px;
    }
}
.pointer {
    cursor: pointer;
}

</style>