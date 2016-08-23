<template>
    <div class='field' :class='{error: !valid && showErrors, required: required}'>
        <label>Name <span v-if='!valid && showErrors'>is required</span></label>
        <input v-model='value' type='text' :placeholder='placeholder'>
    </div>
</template>

<script>
export default {
    data: () => ({

    }),
    computed: {
        valid() {
            return !!this.value.trim()
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
            default: 'eg: Santa Claus'
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