<template>
    <div>
        <button @click='signInWithFacebook'>Sign in with Facebook</button>
        <button @click='signOut'>Sign out</button>
        <div v-if='isSignedIn'>
            <p>{{ userName }} </p>
            <img :src='userPhoto'></img>
        </div>
    </div>
</template>

<script>
import {
    isSignedIn,
    getCurrentUserName,
    getCurrentUserPictureURL
} from '../vuex/modules/auth/getters'

import {
    signInWithFacebook,
    signOut
} from '../vuex/modules/auth/actions'

export default {
    vuex: {
        getters: {
            isSignedIn,
            userName: getCurrentUserName,
            userPhoto: getCurrentUserPictureURL
        },
        actions: {
            signInWithFacebook,
            signOut
        }
    }
}
</script>