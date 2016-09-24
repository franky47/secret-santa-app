<template>
    <div>
        <input type='range' v-model='size' min='50' max='500'>
        <button @click='changeColor'>Change color</button>
        <button @click='render'>Render</button>
        <br>
        <generic-avatar :size='size' text='X' v-ref:avatar></generic-avatar>
        <img :src='url' :width='size' :height='size'>
        <br>

    </div>
</template>

<script>
import GenericAvatar from '../components/GenericAvatar'
import { avatarColors } from '../utility/material-colors'

export default {
    data: () => ({
        size: 100,
        url: null
    }),
    components: {
        GenericAvatar
    },
    methods: {
        changeColor() {
            const pick = array => array[Math.floor(Math.random() * array.length)]
            const color = pick(avatarColors)
            this.$refs.avatar.backColor = color
        },
        render() {
            this.$refs.avatar.getAsFile().then(file => {
                this.readFromFile(file)
            })
        },
        readFromFile(file) {
            const reader = new window.FileReader()
            reader.onload = (event) => {
                this.readFromURL(event.target.result)
            }
            reader.readAsDataURL(file)
        },
        readFromURL(url) {
            this.url = url
        }
    }
}
</script>
