<template>
    <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
        :width='size' :height='size' :viewBox='0, 0, size, size'
    >
        <rect x='0' y='0' :width='size' :height='size' :fill='backColor'/>
        <text
            :x='size * .5'
            :y='size * .475'
            alignment-baseline='central'
            text-anchor='middle'
            :fill='textColor'
            :font-size='size * 0.8'
            opacity='0.9'
            font-weight='300'
            font-family='Roboto'
        >
            {{text}}
        </text>
    </svg>
</template>

<script>
import xmlSerializer from 'xmlserializer'
export default {
    props: {
        size: {
            type: Number,
            default: () => 100
        },
        text: {
            type: String,
            default: () => ''
        },
        'back-color': {
            type: String,
            default: () => '#000'
        },
        'text-color': {
            type: String,
            default: () => '#fff'
        }
    },
    methods: {
        convertToInlineImage() {
            const svg = xmlSerializer.serializeToString(this.$el)
            const base64 = window.btoa(svg)
            return `data:image/svg+xml;base64,${base64}`
        }
    }
}
</script>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Roboto:300';
</style>