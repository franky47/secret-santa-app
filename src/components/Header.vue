<template>
    <div class='ui top fixed borderless menu'>
        <div class='ui container'>
            <div class='item' v-if='mobile'>
                <i class='large content icon'></i>
            </div>
            <div class='item'>
                <i class='large red gift icon' v-if='!mobile'></i>
                <span class='red title'>Secret Santa</span>
            </div>
            <div class='ui secondary pointing menu' v-if='!mobile'>
                <div class='item' v-for='item in menu' v-link='item.link'>
                    {{item.name}}
                </div>
            </div>
            <div class='right item'>
                <div class='circle avatar'></div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import UserSession from './UserSession'
import { onWindowResize } from 'vue-mixins'
import * as routes from '../router/routes-definitions'

export default {
    data: () => ({
        mobile: false,
        links: [
            { name: 'home',             path: routes.home },
            { name: 'auth.signIn',      path: routes.auth.signIn },
            { name: 'auth.register',    path: routes.auth.register },
            { name: 'profile',          path: routes.userProfile }
        ]
    }),
    components: {
        UserSession
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
        }
    },
    mixins: [ onWindowResize ],
    created() {
        this.onWindowResize(() => {
            this.mobile = window.innerWidth <= 768
        })
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

</style>
