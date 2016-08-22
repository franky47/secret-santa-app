<template>
    <div class='field' :class='{error: !valid && showErrors}'>
        <label>Password <span class='instructions'>({{minSize}} characters minimum)</span></label>
        <input v-model='value' type='password' :placeholder='placeholder'>
    </div>
</template>

<script>
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
</style>