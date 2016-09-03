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
                <a class='item' v-link='{ path: routes.settings.account }'>Account</a>
                <a class='item' v-link='{ path: routes.settings.profile }'>Profile</a>
            </div>
        </div>
        <a class='item' @click.stop='signOut'><i class='icon sign out'></i>{{ $t('auth.signOut') }}</a>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import * as routes from '../router/routes-definitions'
import { mutations as ui } from '../vuex/modules/ui'
import { signOut } from '../vuex/modules/auth/actions'

export default {
    data: () => ({
        routes
    }),
    mixins: [ clickaway ],
    vuex: {
        getters: {
            open: state => state.ui.navDrawerOpen
        },
        actions: {
            dismiss: ({dispatch}) => dispatch(ui.CLOSE_NAV_DRAWER),
            signOut
        }
    }
}
</script>

<style scoped>
.ui.sidebar.vertical.menu.overlay {
    width: 80%;
    max-width: 300px;
}
</style>
