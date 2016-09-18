<template>
    <div class='ui segments'>
        <div class='ui secondary segment header'>
            <h4><i class='ui fitted mail icon'></i>{{ $t('settings.account.email.header') }}</h4>
        </div>
        <div class='ui segment'>
            <form class='ui form' :class='{error: error}' @submit.prevent='update'>
                <email v-ref:email
                    :value.sync='email'
                    :label="$t('settings.account.email.newEmail')"
                ></email>
                <password :value.sync='password' :label='$t("settings.account.email.enterPassword")'></password>
                <button class='ui button' :class='{loading: loading}' type='submit'>{{ $t('settings.account.email.update') }}</button>
            </form>
        </div>
        <div class='ui bottom attached error message' v-if='error'>
            <i class='fitted warning circle icon'></i> {{error}}
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Email from '../../../components/form/Email'
import Password from '../../../components/form/Password'
import { getCurrentUser } from '../../../vuex/modules/user/getters'
import { updateUserEmail } from '../../../vuex/modules/auth/actions'

export default {
    data: () => ({
        email: '',
        password: '',
        loading: false,
        error: null
    }),
    components: { Email, Password },
    methods: {
        update() {
            if (!this.email.trim()) {
                this.error = Vue.t('settings.account.email.validEmail')
                return
            }
            this.loading = true
            this.updateUserEmail(this.email.trim(), this.password)
            .then(() => {
                this.reset()
            })
            .catch(error => {
                this.loading = false
                this.error = error
            })
        },
        reset() {
            this.email      = this.userEmail
            this.password   = ''
            this.loading    = false
            this.error      = null
        }
    },
    watch: {
        userEmail(value) {
            this.email = value
        }
    },
    route: {
        activate: function() {
            console.log('activate')
        },
        data: function() {
            console.log('data')
        }
    },
    vuex: {
        getters: {
            userEmail:  getCurrentUser.email
        },
        actions: {
            updateUserEmail
        }
    }
}
</script>
