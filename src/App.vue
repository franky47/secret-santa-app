<template>
    <div class='ui container'>
        <app-header></app-header>
        <register></register>
    </div>
</template>

<script>
import AppHeader from './components/Header'
import Avatar from './components/Avatar'
import Register from './views/auth/RegisterView'
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
