<template>
    <div class='ui horizontal list right floated' v-show='isSignedIn' transition='fade'>
        <div class='item' @click='goToProfile()'>
            <img class='ui mini circular image' :src='photoUrl'>
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
import Avatar from './Avatar'
import {
    isSignedIn,
    getCurrentUserName,
    getCurrentUserPictureURL
} from '../vuex/modules/auth/getters'
import {
    signOut
} from '../vuex/modules/auth/actions'

export default {
    data: () => ({
        fadeOutBuffer: {
            name: '',
            photoUrl: '',
            use: false
        }
    }),
    components: {
        Avatar
    },
    methods: {
        goToProfile: () => {
            // todo: route to /profile
        },
        triggerSignOut: function() {
            const buffer = this.fadeOutBuffer
            buffer.name     = this.userName
            buffer.photoUrl = this.userPhoto
            buffer.use      = true
            setTimeout(() => {
                buffer.use = false // Let the animation end
            }, 300)
            this.signOut()
        }
    },
    computed: {
        name: function() {
            const buffer = this.fadeOutBuffer
            return buffer.use ? buffer.name : this.userName
        },
        photoUrl: function() {
            const buffer = this.fadeOutBuffer
            return buffer.use ? buffer.photoUrl : this.userPhoto
        }
    },
    vuex: {
        getters: {
            isSignedIn,
            userName: getCurrentUserName,
            userPhoto: getCurrentUserPictureURL
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