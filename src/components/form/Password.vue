<template>
    <div class='field' :class='{error: !valid && showErrors, required: required}'>
        <label>{{ label }}
            <span v-if='instructions' class='instructions'>
                {{ $t('form.validation.passwordLength', { length: minSize }) }}
            </span>
        </label>
        <input v-model='value' type='password' :placeholder='placeholder' :class='{matching: matching}'>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    data: () => ({

    }),
    computed: {
        valid() {
            return this.value.trim().length >= this.minSize
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
            default: () => Vue.t('password')
        },
        placeholder: {
            type: String,
            default: '••••••••'
        },
        minSize: {
            type: Number,
            default: 8
        },
        showErrors: {
            type: Boolean,
            default: false
        },
        instructions: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        matching: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.instructions {
    font-style: italic;
    font-weight: 100;
    color: #888;
}
.ui.form input[type=password].matching:focus {
    border-color: #72d272;
}
</style>
