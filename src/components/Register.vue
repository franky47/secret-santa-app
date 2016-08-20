<template>
    <form @submit.prevent='register' class='ui form' :class='{error: errorMessage}'>
        <div class='field' :class='{error: check(validation.email)}'>
            <label>E-mail <span v-if='check(validation.email)'>must be valid</span></label>
            <input v-model='user.email' type='email' placeholder='eg: santa.claus@xmas.com'>
        </div>
        <div class='field' :class='{error: check(validation.password)}'>
            <label>Password (8 characters minimum)</label>
            <input v-model='user.password' type='password' placeholder='••••••••'>
        </div>
        <!--h4 class='ui dividing header'>Profile information</h4-->
        <div class='field' :class='{error: check(validation.name)}'>
            <label>Name <span v-if='check(validation.name)'>is required</span></label>
            <input type='text' v-model='user.name' placeholder='eg: Santa Claus'>
        </div>
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
import materialColors from '../utility/material-colors'
import {
    registerWithEmail,
    updateUserProfile
} from '../vuex/modules/auth/actions'
const emailRE = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
    data: () => ({
        displayErrors: false,
        loading: false,
        user: {
            name: '',
            email: '',
            password: '',
            avatarColor: ''
        },
        errorMessage: ''
    }),
    components: {
        Avatar
    },
    computed: {
        validation() {
            return {
                name: !!this.user.name.trim(),
                email: emailRE.test(this.user.email),
                password: this.user.password.trim().length >= 8
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
                this.displayErrors = true
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
            return this.displayErrors && !field
        },
        reset() {
            this.displayErrors = false
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

<style scoped>
.changeColor {
    display: inline-block;
    font-weight: 100;
}
</style>