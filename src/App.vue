<template>
    <div>
        <app-header></app-header>
        <div class='ui top-margin container'>
            <router-view class='fade' transition='fade' transition-mode='out-in'>
            </router-view>
        </div>
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
.ui.top-margin.container {
    margin-top: 75px;
}
</style>
