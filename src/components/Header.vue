<template>
    <div class='ui top fixed borderless menu'>
        <div class='ui container'>
            <div class='header item' @click.stop.prevent='openNavDrawer'>
                <i class='large red gift--desktop content--mobile icon'></i>
                <span class='red title'>Secret Santa</span>
            </div>
            <div class='ui secondary pointing menu hidden--mobile'>
                <div class='item' v-for='item in menu' v-link='item.link'>
                    {{item.name}}
                </div>
            </div>
            <div class='right item hidden--mobile' v-if='isSignedIn && userPhoto'>
                <img class='ui circular avatar image'
                     @click.stop='accountOpen = !accountOpen'
                     :src='userPhoto'>
                <account-popup v-if='accountOpen'
                    transition='popup'
                    :open.sync='accountOpen'>
                </account-popup>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import AccountPopup from './AccountPopup'
import * as routes from '../router/routes-definitions'
import { getters as auth } from '../vuex/modules/auth'
import { getters as user } from '../vuex/modules/user'
import { actions as ui } from '../vuex/modules/ui'

export default {
    data: () => ({
        accountOpen: false,
        links: [
            { name: 'home',             path: routes.home },
            { name: 'auth.signIn',      path: routes.auth.signIn },
            { name: 'auth.register',    path: routes.auth.register },
            { name: 'settings.profile._', path: routes.settings.profile },
            { name: 'settings.account._', path: routes.settings.account }
        ]
    }),
    components: {
        AccountPopup
    },
    computed: {
        menu() {
            return this.links.map(e => ({
                name: Vue.t(e.name),
                link: {
                    path: e.path,
                    activeClass: 'active',
                    exact: true
                }
            }))
        },
        signInLink() {
            let link = {
                path: routes.auth.signIn
            }
            if (this.path) {
                Object.assign(link, { query: { next: this.path } })
            }
            return link
        }
    },
    vuex: {
        getters: {
            isSignedIn:     auth.isSignedIn,
            userPhoto:      user.getCurrentUser.photoURL,
            path: state => state.route.path
        },
        actions: {
            openNavDrawer: ui.openNavDrawer
        }
    }
}
</script>

<style scoped>

/* Fix layout issue #20 on iOS */
.ui.menu>.container {
    display: -webkit-flex;
    -webkit-box-orient: horizontal;
}
span.title {
    display: block;
}

/* -- */

/* Variable Icon (gift on desktop, content on moble) */
@media only screen and (min-width: 768px) {
    .gift--desktop:before {
        content: "\f06b";
    }
}
@media only screen and (max-width: 767px) {
    .content--mobile:before {
        content: "\f0c9";
    }
    .hidden--mobile {
        display: none !important;
    }
}

.red {
    color: #db2828;
}

.item .content.icon {
    color: #f1abab;
}
.ui.container .item {
    padding: 0;
}
.ui.container .item .title {
    font-size: 1.2em;
    font-weight: 900;
}

@media only screen and (max-width: 767px) {
    .ui.container .item:first-child {
        padding-left: 1em;
    }
}
@media only screen and (max-width: 767px) {
    .ui.container .right.item:last-child {
        padding-right: 1em;
    }
}
.ui.container .secondary.menu {
    margin-left: 20px;
    border-bottom: none;
}
.ui.container .secondary.menu .item:hover {
    cursor: pointer;
    border-bottom-color: #f5c1c1;
}
.ui.container .secondary.menu .active.item {
    border-bottom-color: #db2828;
}
.ui.container .secondary.menu .active.item:hover {
    border-bottom-color: #e66a6a;
}

.circle {
    border-radius: 100%;
}
.popup-transition {
    transition: all .3s ease;
}
.popup-enter, .popup-leave {
    opacity: 0;
}

</style>
