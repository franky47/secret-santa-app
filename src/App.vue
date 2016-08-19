<template>
    <div class='ui container'>
        <app-header></app-header>
        <!-- avatar text='F' back-color='orange'></avatar -->
        <sign-in></sign-in>
        <!-- register></register -->
    </div>
</template>

<script>
import AppHeader from './components/Header'
import Avatar from './components/Avatar'
import Register from './components/Register'
import SignIn from './views/auth/SignInView'
import UserSession from './components/UserSession'

export default {
    components: {
        AppHeader,
        Avatar,
        Register,
        SignIn,
        UserSession
    }
}
</script>

<style scoped>
.signin-wrapper {
    max-width: 450px;
    margin: 0 auto;
}
</style>
