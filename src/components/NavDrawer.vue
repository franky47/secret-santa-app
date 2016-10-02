<template>
    <div class='ui sidebar vertical menu overlay visible' :class='{open: open}'
        v-on-clickaway='dismiss'>
        <div class='item' v-if='isSignedIn'>
            <img class='ui avatar image' :src='userPhoto'>
            <span class='header'>{{userName}}</span>
        </div>
        <div class='item' v-if='!isSignedIn'>
            <a @click.stop='signIn'>{{ $t('auth.signIn') }}</a>
        </div>
        <div class='item' v-if='isSignedIn'>
            <i class='settings icon'></i>{{$t('settings._')}}
            <div class='menu'>
                <a class='item' v-link='{ path: routes.settings.profile }'>{{ $t('settings.profile._') }}</a>
                <a class='item' v-link='{ path: routes.settings.account }'>{{ $t('settings.account._') }}</a>
            </div>
        </div>
        <a class='item' @click.stop='signOut' v-if='isSignedIn'>
            <i class='icon sign out'></i>{{ $t('auth.signOut') }}
        </a>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import * as routes      from '../router/routes-definitions'
import * as ui          from '../vuex/modules/ui'
import * as auth        from '../vuex/modules/auth'
import { getCurrentUser } from '../vuex/modules/user/getters'

export default {
    data: () => ({
        routes
    }),
    mixins: [ clickaway ],
    methods: {
        dismiss() {
            if (this.open) {
                this.close()
            }
        },
        signIn() {
            this.dismiss()
            this.$router.go(routes.auth.signIn)
        }
    },
    vuex: {
        getters: {
            open:       ui.getters.isNavDrawerOpen,
            userName:   getCurrentUser.displayName,
            userPhoto:  getCurrentUser.photoURL,
            isSignedIn: auth.getters.isSignedIn
        },
        actions: {
            close:      ui.actions.closeNavDrawer,
            signOut:    auth.actions.signOut
        }
    }
}
</script>

<style lang='scss' scoped>
.ui.sidebar.vertical.menu.overlay {
    width: 80%;
    max-width: 300px;
    &.open {
        transform: none;
    }
    &:not(.open) {
        transform: translateX(-100%), ;
    }
}
</style>
