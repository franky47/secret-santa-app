<template>
    <div class='account popup'>
        <div class='ui center aligned segment'>
            <img class='ui circular centered image' :src='userPhoto'>
            <div class='ui header'>{{userName}}
                <div class='sub header'>{{userEmail}}</div>
            </div>
            <div class='meta'></div>
            <div class='ui primary basic fluid button'>
                <i class='fitted user icon'></i>
                My Account
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
import { isSignedIn, getCurrentUser } from '../vuex/modules/auth/getters'
import { signOut } from '../vuex/modules/auth/actions'
import * as routes from '../router/routes-definitions'

export default {
    data: () => ({
        fadeOutBuffer: {
            name: '',
            email: '',
            photoURL: '',
            use: false
        }
    }),
    props: {
        open: {
            type: Boolean,
            twoWay: true
        }
    },
    methods: {
        goToProfile: () => {
            this.$router.go(routes.userProfile)
            this.dismiss()
        },
        triggerSignOut: function() {
            const buffer = this.fadeOutBuffer
            buffer.name     = this.userName
            buffer.email    = this.userEmail
            buffer.photoURL = this.userPhoto
            buffer.use      = true
            this.signOut().then(() => {
                this.dismiss()
                this.$router.go(routes.home)
            })
        },
        dismiss() {
            this.open = false
        }
    },
    computed: {
        name() {
            const buffer = this.fadeOutBuffer
            return buffer.use ? buffer.name : this.userName
        },
        email() {
            const buffer = this.fadeOutBuffer
            return buffer.use ? buffer.email : this.userEmail
        },
        photoURL() {
            return this.userPhoto
        }
    },
    vuex: {
        getters: {
            isSignedIn,
            userName:  getCurrentUser.name,
            userEmail: getCurrentUser.email,
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

</style>