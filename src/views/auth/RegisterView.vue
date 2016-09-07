<template>
    <div class='wrapper'>
        <h1>{{ $t('auth.createNewAccount') }}</h1>
        <form @submit.prevent='register' class='ui form' :class='{error: errorMessage}'>
            <email :value.sync='user.email' :show-errors='showErrors' v-ref:email required></email>
            <password :value.sync='user.password' :show-errors='showErrors' v-ref:password instructions required></password>
            <name :value.sync='user.name' :show-errors='showErrors' v-ref:name required></name>
            <avatar v-ref:avatar :user-name='user.name'></avatar>
            <div class='ui error message'>
                <div class='header'>Error</div>
                <p>{{errorMessage}}</p>
            </div>
            <button class='ui basic green button' :class='{loading: loading}' type='submit'>
                <i class='fitted icons'>
                    <i class='icon user'></i>
                    <i class='corner add icon'></i>
                </i> {{ $t('auth.createAccount') }}
            </button>
        </form>
    </div>
</template>

<script>
import Avatar   from '../../components/form/Avatar'
import Email    from '../../components/form/Email'
import Password from '../../components/form/Password'
import Name     from '../../components/form/Name'
import {
    registerWithEmail,
    updateUserProfile
} from '../../vuex/modules/auth/actions'
import { home } from '../../router/routes-definitions'

export default {
    data: () => ({
        showErrors: false,
        loading: false,
        user: {
            email: '',
            password: '',
            name: ''
        },
        errorMessage: ''
    }),
    components: {
        Email,
        Password,
        Name,
        Avatar
    },
    computed: {
        validation() {
            const email     = this.$refs.email    || { valid: false }
            const password  = this.$refs.password || { valid: false }
            const name      = this.$refs.name     || { valid: false }
            return {
                name:       name.valid,
                email:      email.valid,
                password:   password.valid
            }
        },
        isValid() {
            const validation = this.validation
            return Object.keys(validation).every((key) => validation[key])
        },
        avatarLetter() {
            return (this.user.name.trim()[0] || '').toUpperCase()
        }
    },
    methods: {
        register() {
            if (!this.isValid) {
                this.showErrors = true
                return
            }
            this.registerWithEmail(this.user.email, this.user.password)
                .then(() => {
                    const avatar = this.$refs.avatar
                    const photoURL = avatar.getURL()
                    const profile = {
                        displayName: this.user.name,
                        photoURL
                    }
                    return this.updateUserProfile(profile)
                }).then(() => { // success
                    this.loading = false
                    this.reset()
                    this.$router.go(home)
                }).catch((error) => { // failed
                    this.loading = false
                    this.errorMessage = error.message
                })
            this.loading = true
        },
        check(field) {
            return this.showErrors && !field
        },
        reset() {
            this.showErrors = false
            this.user.email = ''
            this.user.password = ''
            this.user.name = ''
            this.errorMessage = ''
        }
    },
    vuex: {
        actions: {
            registerWithEmail,
            updateUserProfile
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 450px;
    min-width: 292px;
    margin: 50px auto;
}
</style>