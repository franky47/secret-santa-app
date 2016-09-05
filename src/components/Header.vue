<template>
    <div class='ui top fixed borderless menu'>
        <div class='ui container'>
            <a class='item' v-if='mobile' @click.stop='openNavDrawer'>
                <i class='large content icon'></i>
            </a>
            <div class='item'>
                <i class='large red gift icon' v-if='!mobile'></i>
                <span class='red title'>Secret Santa</span>
            </div>
            <div class='ui secondary pointing menu' v-if='!mobile'>
                <div class='item' v-for='item in menu' v-link='item.link'>
                    {{item.name}}
                </div>
            </div>
            <div class='right item' v-if='isSignedIn'>
                <img class='ui circular avatar image' @click.stop='accountOpen = !accountOpen' :src='userPhoto'>
                <account-popup v-if='accountOpen'
                    transition='popup'
                    :open.sync='accountOpen'>
                </account-popup>
            </div>
            <div class='right item' v-if='!isSignedIn'>
                <a v-link='signInLink'></a>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import AccountPopup from './AccountPopup'
import { onWindowResize } from 'vue-mixins'
import * as routes from '../router/routes-definitions'
import { getters as auth } from '../vuex/modules/auth'
import { getters as user } from '../vuex/modules/user'

export default {
    data: () => ({
        mobile: false,
        accountOpen: false,
        links: [
            { name: 'home',             path: routes.home },
            { name: 'auth.signIn',      path: routes.auth.signIn },
            { name: 'auth.register',    path: routes.auth.register },
            { name: 'profile',          path: routes.settings.profile },
            { name: 'account',          path: routes.settings.account }
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
    mixins: [ onWindowResize ],
    created() {
        this.mobile = window.innerWidth <= 768
        this.onWindowResize(() => {
            this.mobile = window.innerWidth <= 768
        })
    },
    vuex: {
        getters: {
            isSignedIn:     auth.isSignedIn,
            userPhoto:      user.getCurrentUser.photoURL,
            path: state => state.route.path
        },
        actions: {
            openNavDrawer: ({dispatch}) => dispatch(ui.OPEN_NAV_DRAWER)
        }
    }
}
</script>

<style scoped>
.item .content.icon {
  color: #f1abab;
}

.red {
  color: #db2828;
}

.ui.container .item {
  padding: 0;
}
.ui.container .item .title {
  font-size: 1.2em;
  font-weight: 900;
}
@media only screen and (max-width: 768px) {
  .ui.container .item:first-child {
    padding-left: 1em;
  }
}
@media only screen and (max-width: 768px) {
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

.avatar {
  width: 30px;
  height: 30px;
  background: url(http://gravatar.com/avatar?d=mm&s=100);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
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
