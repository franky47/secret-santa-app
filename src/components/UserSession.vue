<template>
    <div class='ui horizontal list right floated' v-show='isSignedIn' transition='fade'>
        <div class='item'>
            <img class='ui mini circular image' :src='photoURL' @click='goToProfile'>
            <div class='content'>
                <div class='ui sub header'><span class='no-transform'>{{name}}</span></div>
                <a href='#' @click.stop='triggerSignOut'>
                    <i class='fitted icon sign out'></i> Sign out
                </a>
            </div>
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
            photoURL: '',
            use: false
        }
    }),
    methods: {
        goToProfile: () => {
            this.$router.go(routes.userProfile)
        },
        triggerSignOut: function() {
            const buffer = this.fadeOutBuffer
            buffer.name     = this.userName
            buffer.photoURL = this.userPhoto
            buffer.use      = true
            setTimeout(() => {
                buffer.use = false // Let the animation end
            }, 300)
            this.signOut().then(() => {
                this.$router.go(routes.home)
            })
        }
    },
    computed: {
        name() {
            const buffer = this.fadeOutBuffer
            return buffer.use ? buffer.name : this.userName
        },
        photoURL() {
            const buffer = this.fadeOutBuffer
            return buffer.use ? buffer.photoURL : this.userPhoto
        }
    },
    vuex: {
        getters: {
            isSignedIn,
            userName:  getCurrentUser.name,
            userPhoto: getCurrentUser.photoURL
        },
        actions: {
            signOut
        }
    }
}
</script>
<style scoped>
.no-transform {
    text-transform: initial;
}
.fade-transition {
    transition: all .3s ease;
}
.fade-enter, .fade-leave {
    opacity: 0;
}
</style>