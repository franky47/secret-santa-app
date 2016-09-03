<template>
    <div class='ui sidebar vertical menu overlay' :class='{visible: open}'
        v-on-clickaway='dismiss'>
        <div class='item'>
            <img class='ui avatar image' src='http://placehold.it/100'>
            <span class='header'>Foo Bar</span>
        </div>
        <div class='item'>
            <i class='settings icon'></i>Settings
            <div class='menu'>
                <a class='item'>Account</a>
                <a class='item'>Profile</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
    data: () => ({
        open: true
    }),
    methods: {
        open() {
            this.open = true
        },
        dismiss() {
            this.open = false
        }
    },
    mixins: [ clickaway ]
}
</script>

<style scoped>
.ui.sidebar.vertical.menu.overlay {
    width: 80%;
    max-width: 300px;
}
</style>
