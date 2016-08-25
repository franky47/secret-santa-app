<template>
    <div class='field'
        style='user-select:none' unselectable='on'
        onselectstart='return false'
        onmousedown='return false'
    >
        <label>Avatar</label>
        <generic-avatar :back-color='color' :text='letter' v-ref:avatar></generic-avatar>
        <div class='avatar controls'>
            <div class='ui list'>
                <div class='item'><i class='icon refresh'></i><div class='content'><a @click='changeColor'>Change color</a></div></div>
                <div class='item'><i class='icon close'></i><div class='content'><a @click='removeImage'>Remove image</a></div></div>
            </div>
        </div>
        <input id='avatarSelectFile' type='file' style='visibility:hidden'>
    </div>
</template>

<script>
import { avatarColors } from '../../utility/material-colors'
import GenericAvatar from '../GenericAvatar'

export default {
    data: () => ({
        useGeneric: false,
        color: ''
    }),
    components: { GenericAvatar },
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
        getUrl() {
            return this.$refs.avatar.convertToInlineImage()
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
</style>