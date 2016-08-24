<template>
    <div class='wrapper'>
        <h1>Home Page</h1>
        <ul>
            <li><a v-link='{ path: links.signIn }'>Sign In</a></li>
            <li><a v-link='{ path: links.register }'>Register </a></li>
            <li><a v-link='{ path: links.profile }'>Profile </a></li>
        </ul>
    </div>
</template>

<script>
import * as routes from '../router/routes-definitions'

export default {
    data: () => ({
        links: {
            signIn:     routes.auth.signIn,
            register:   routes.auth.register,
            profile:    routes.userProfile
        }
    })
}
</script>