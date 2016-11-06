<template>
    <div class='field' :class='{error: !valid && showErrors, required: required}'>
        <label>{{label}} <span v-if='!valid && showErrors'>{{ $t('form.validation.mustBeValid') }}</span></label>
        <input v-model='value' type='email' :placeholder='placeholder' class='large--mobile'>
    </div>
</template>

<script>
const emailRE = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
    data: () => ({

    }),
    computed: {
        valid() {
            return emailRE.test(this.value)
        }
    },
    props: {
        value: {
            type: String,
            default: '',
            twoWay: true
        },
        label: {
            type: String,
            default: 'E-mail'
        },
        placeholder: {
            type: String,
            default: ''
        },
        showErrors: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        }
    }
}
</script>
