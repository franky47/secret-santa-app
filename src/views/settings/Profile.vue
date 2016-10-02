<template>
    <div>
        <h2>{{ $t('your') + ' ' + $t('settings.profile._') }}</h2>
        <form @submit.prevent='update' class='ui form' :class='{error: errorMessage}'>
            <name :value.sync='newName'></name>
            <avatar :user-name='newName'></avatar>
            <language-selector :value.sync='newLocale' :label="$t('form.language')"
                :options='availableLocales'
            ></language-selector>
            <div class='ui error message'>
                <div class='header'>Error</div>
                <p>{{errorMessage}}</p>
            </div>
            <button class='ui basic green button' :class='{loading: loading}' type='submit'>
                <i class='fitted icon checkmark'></i> {{ $t('settings.profile.update') }}
            </button>
        </form>
    </div>
</template>

<script>
import Name                     from '../../components/form/Name'
import Avatar                   from '../../components/form/Avatar'
import LanguageSelector         from '../../components/form/Select'
import * as auth                from '../../vuex/modules/auth'
import * as user                from '../../vuex/modules/user'
import { localeNames }          from '../../i18n/i18n'
import * as i18n                from '../../vuex/modules/i18n'

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
            this.newName    = this.name
            this.newLocale  = this.locale
            this.loading    = false
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
        },
        name(value) {
            this.newName = value
        }
    },
    vuex: {
        getters: {
            name:                   user.getters.getCurrentUser.displayName,
            locale:                 i18n.getters.locale
        },
        actions: {
            updateUserProfile:      auth.actions.updateUserProfile,
            setLocale:              i18n.actions.setLocale
        }
    }
}
</script>
