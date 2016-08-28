<template>
    <div class='field'>
        <label>{{ label }}</label>
        <div class='ui fluid search dropdown selection' @click='this.menuVisible = !this.menuVisible' :class='dropDownClass'>
            <select class='ui compact dropdown'>
                <option v-for='opt in options' :value='opt.value'>{{ opt.name }}</option>
            </select>
            <i class='dropdown icon'></i>
            <!-- input v-if='searchable' class='search' autocomplete='off' tabindex='0' @change='' -->
            <div class='text'>{{ value.name }}</div>
            <div class='menu transition' tabindex='-1' :class='menuClass'>
                <div v-for='opt in options' class='item' :data-value='opt.value' @click='select(opt)'>{{ opt.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        menuVisible: false
    }),
    props: {
        label: {
            type: String,
            default: 'Select',
            required: true
        },
        searchable: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: () => [],
            required: true
        },
        defaultText: {
            type: String,
            default: ''
        },
        value: {
            type: Object,
            required: true,
            default: () => ({ value: null, name: '' }),
            twoWay: true
        }
    },
    methods: {
        select(option) {
            this.value = option
        }
    },
    computed: {
        dropDownClass() {
            return {
                visible: this.menuVisible,
                active:  this.menuVisible
            }
        },
        menuClass() {
            return {
                visible: this.menuVisible,
                hidden: !this.menuVisible
            }
        }
    }
}
</script>