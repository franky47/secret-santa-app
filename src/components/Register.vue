<template>
    <form @submit.prevent='register' class='ui form' :class='{error: errorMessage}'>
        <email :value.sync='user.email' :show-errors='showErrors' v-ref:email required></email>
        <password :value.sync='user.password' :show-errors='showErrors' v-ref:password required></password>
        <name :value.sync='user.name' :show-errors='showErrors' v-ref:name required></name>
        <div class='field' v-if='user.name'
            style='user-select:none' unselectable='on'
            onselectstart='return false'
            onmousedown='return false'
        >
            <label>Avatar <i class='ui small grey icon refresh' @click='changeColor'></i></label>
            <avatar :back-color='user.avatarColor' :text='avatarLetter'></avatar>
        </div>
        <div class='ui error message'>
            <div class='header'>Error</div>
            <p>{{errorMessage}}</p>
        </div>
        <button class='ui basic green button' :class='{loading: loading}' type='submit'>
            <i class='fitted icons'>
                <i class='icon user'></i>
                <i class='corner add icon'></i>
            </i> Create Account
        </button>
    </form>
</template>

<script>
import Avatar from './Avatar'
import Email from './form/Email'
import Password from './form/Password'
import Name from './form/Name'
import materialColors from '../utility/material-colors'
import {
    registerWithEmail,
    updateUserProfile
} from '../vuex/modules/auth/actions'

export default {
    data: () => ({
        showErrors: false,
        loading: false,
        user: {
            email: '',
            password: '',
            name: '',
            avatarColor: ''
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
                    const avatar = this.$children[0]
                    const photoURL = avatar.convertToInlineImage()
                    const profile = {
                        displayName: this.user.name,
                        photoURL
                    }
                    return this.updateUserProfile(profile)
                }).then(() => { // success
                    this.loading = false
                    this.reset()
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
        },
        changeColor() {
            const colors = []
            for (let color in materialColors) { colors.push(materialColors[color]) }
            const pick = (array) => array[Math.floor(Math.random() * array.length)]
            this.user.avatarColor = pick(colors)
        }
    },
    vuex: {
        actions: {
            registerWithEmail,
            updateUserProfile
        }
    },
    attached() {
        this.changeColor()
    }
}
</script>
