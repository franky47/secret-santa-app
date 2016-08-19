<template>
    <div class='ui horizontal list right floated' v-show='isSignedIn'>
        <div class='item' @click='goToProfile()'>
            <img class='ui mini circular image' :src='userPhoto'>
            <div class='content'>
                <div class='ui sub header'><span class='no-transform'>{{userName}}</span></div>
                <a href='#' @click.stop='signOut'>
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

    }),
    components: {
        Avatar
    },
    methods: {
        goToProfile: () => {
            console.log('go to profile')
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
</style>