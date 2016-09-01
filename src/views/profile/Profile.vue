<template>
    <h2>Your Profile</h2>
    <form @submit.prevent='update' class='ui form' :class='{error: errorMessage}'>
        <name :value.sync='newName'></name>
        <avatar :user-name='newName'></avatar>
        <language-selector :value.sync='newLocale' :label="$t('language')"
            :options='availableLocales'
        ></language-selector>
        <div class='ui error message'>
            <div class='header'>Error</div>
            <p>{{errorMessage}}</p>
        </div>
        <button class='ui basic green button' :class='{loading: loading}' type='submit'>
            <i class='fitted icon checkmark'></i> Update
        </button>
    </form>
</template>

<script>
import Name                     from '../../components/form/Name'
import Avatar                   from '../../components/form/Avatar'
import LanguageSelector         from '../../components/form/Select'
import { getCurrentUser }       from '../../vuex/modules/auth/getters'
import { updateUserProfile }    from '../../vuex/modules/auth/actions'
import { localeNames }          from '../../i18n/i18n'
import { setLocale }            from '../../vuex/modules/i18n/actions'
import { locale } from '../../vuex/modules/i18n/getters'

export default {
    data: () => ({
        newName: '',
        newLocale: '',
        loading: false,
        errorMessage: ''
    }),
    components: { Name, Avatar, LanguageSelector },
    methods: {
        update() {
            this.loading = true
            const profile = {
                displayName: this.newName
            }
            Promise.all([
                this.setLocale(this.newLocale),
                this.updateUserProfile(profile)
            ]).then(() => {
                this.reset()
            })
            .catch(error => {
                this.loading = false
                this.errorMessage = error.message
            })
        },
        reset() {
            this.newName = this.name
            this.newLocale = this.locale
            this.loading = false
        }
    },
    computed: {
        availableLocales: () => localeNames
    },
    created() {
        this.reset()
    },
    watch: {
        locale(value) {
            this.newLocale = value
        }
    },
    vuex: {
        actions: {
            updateUserProfile,
            setLocale
        },
        getters: {
            name:    getCurrentUser.name,
            locale
        }
    }
}
</script>