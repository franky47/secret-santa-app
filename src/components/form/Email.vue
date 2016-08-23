<template>
    <div class='field' :class='{error: !valid && showErrors, required: required}'>
        <label>E-mail <span v-if='!valid && showErrors'>must be valid</span></label>
        <input v-model='value' type='email' :placeholder='placeholder'>
    </div>
</template>

<script>
const emailRE = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
        placeholder: {
            type: String,
            default: 'eg: santa.claus@xmas.com'
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