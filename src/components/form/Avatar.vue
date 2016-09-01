<template>
    <div class='field'
        style='user-select:none' unselectable='on'
        onselectstart='return false'
        onmousedown='return false'
    >
        <label>Avatar</label>
        <generic-avatar :back-color='color' :text='letter' v-ref:avatar></generic-avatar>
        <div class='avatar controls'>
            <color-picker :value.sync='color' v-if='selectColor' class='color-picker'
                v-on-clickaway='selectColor = false'
                transition='popup'
            ></color-picker>
            <div class='ui list'>
                <div class='item'><i class='icon paint brush'></i><div class='content'><a @click.stop='selectColor = true'>Change color</a></div></div>
                <div class='item'><i class='icon close'></i><div class='content'><a @click='removeImage'>Remove image</a></div></div>
            </div>
        </div>
        <input id='avatarSelectFile' type='file' style='visibility:hidden'>
    </div>
</template>

<script>
import { avatarColors } from '../../utility/material-colors'
import GenericAvatar from '../GenericAvatar'
import ColorPicker from '../ColorPicker'
import { mixin as clickaway } from 'vue-clickaway'

export default {
    data: () => ({
        useGeneric: false,
        selectColor: false,
        color: ''
    }),
    mixins: [ clickaway ],
    components: { GenericAvatar, ColorPicker },
    props: {
        userName: {
            type: String,
            default: ''
        }
    },
    computed: {
        letter() {
            return this.userName[0] || ''
        }
    },
    methods: {
        changeColor() {
            const pick = array => array[Math.floor(Math.random() * array.length)]
            this.color = pick(avatarColors)
        },
        selectFile() {
            const input = document.getElementById('avatarSelectFile')
            input.click()
        },
        getURL() {
            return this.$refs.avatar.convertToInlineImage()
        },
        removeImage() {
            // todo: implement me.
        }
    },
    attached() {
        this.changeColor()
    }
}
</script>

<style scoped>
.avatar.controls {
    margin-left: 10px;
    display: inline-block;
    vertical-align: top
}
.color-picker {
    position: absolute;
}
.popup-transition {
    transition: all .3s ease;
    z-index: 1;
}
.popup-enter, .popup-leave {
    opacity: 0;
}
</style>