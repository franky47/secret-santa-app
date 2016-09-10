<template>
    <div class='ui two column grid'>
        <div class='four wide column'>
            <h1 class='ui header'>{{ $t('settings.settings') }}</h1>
            <div class='ui vertical pointing menu'>
                <a v-for='item in menu' class='item' v-link='item.link'>{{ item.name }}</a>
            </div>
            <button class='ui basic icon button'>
                <i class='icon sign out'></i>
                {{ $t('auth.signOut') }}
            </button>
        </div>
        <div class='column'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import * as routes from '../router/routes-definitions'

export default {
    data: () => ({
        links: [
            { name: 'settings.account', path: routes.settings.account },
            { name: 'settings.profile', path: routes.settings.profile }
        ]
    }),
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
    }
}
</script>
