<template>
    <div class='ui container'>
        <app-header></app-header>
        <router-view class='fade' transition='fade' transition-mode='out-in'>
        </router-view>
    </div>
</template>

<script>
import AppHeader from './components/Header'

export default {
    components: {
        AppHeader
    }
}
</script>

<style scoped>
.fade {
    transition: opacity .3s ease;
}
.fade-enter, .fade-leave {
    opacity: 0;
}
</style>
