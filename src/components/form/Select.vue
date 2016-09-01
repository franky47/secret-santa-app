<template>
    <div class='field'>
        <label>{{ label }}</label>
        <div class='ui fluid search dropdown selection' @click='this.menuVisible = !this.menuVisible' :class='dropDownClass'>
            <select class='ui compact dropdown'>
                <option v-for='opt in optionKeys' :value='opt'>{{ options[opt] }}</option>
            </select>
            <i class='dropdown icon'></i>
            <!-- input v-if='searchable' class='search' autocomplete='off' tabindex='0' @change='' -->
            <div class='text'>{{ options[value] }}</div>
            <div class='menu transition' tabindex='-1' :class='menuClass'>
                <div v-for='opt in optionKeys' class='item' :data-value='opt' @click='select(opt)'>{{ options[opt] }}</div>
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
            type: Object,
            default: () => ({}),
            required: true
        },
        defaultText: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            required: true,
            twoWay: true
        }
    },
    methods: {
        select(option) {
            this.value = option
        }
    },
    ready() {
        console.log(this.options)
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
        },
        optionKeys() {
            const keys = Object.keys(this.options)
            console.log(keys)
            return keys
        }
    }
}
</script>