<template>
    <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
        :width='size' :height='size' :viewBox='0, 0, size, size'
    >
        <rect x='0' y='0' :width='size' :height='size' :fill='backColor'/>
        <text
            :x='x'
            :y='y'
            alignment-baseline='central'
            text-anchor='middle'
            :fill='textColor'
            :font-size='fontSize'
            font-weight='300'
            font-family='Roboto'
        >
            {{text}}
        </text>
    </svg>
</template>

<script>
// import 'blob-polyfill'
// import xmlSerializer from 'xmlserializer'
import { setupCanvas } from '../utility/canvas'

// canvas.toBlob polyfill
if (!window.HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(window.HTMLCanvasElement.prototype, 'toBlob', {
        value(callback, type, quality) {
            const str = window.atob(this.toDataURL(type, quality).split(',')[1])
            const len = str.length
            const arr = new window.Uint8Array(len)
            for (let i = 0; i < len; ++i) {
                arr[i] = str.charCodeAt(i)
            }
            callback(new window.Blob([arr], {type: type || 'image/png'}))
        }
    })
}

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
        backColor: {
            type: String,
            default: () => '#000'
        },
        textColor: {
            type: String,
            default: () => 'rgba(255, 255, 255, 0.9)'
        }
    },
    computed: {
        x() {
            return this.size * 0.5
        },
        y() {
            return this.size * 0.475
        },
        fontSize() {
            return this.size * 0.8
        }
    },
    methods: {
        getAsFile() {
            return new Promise((resolve, reject) => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                setupCanvas(canvas, this.size)
                ctx.save()
                ctx.fillStyle = this.backColor
                ctx.fillRect(0, 0, this.size, this.size)
                ctx.restore()
                ctx.font         = `${this.fontSize}px Roboto`
                ctx.textAlign    = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillStyle    = this.textColor
                ctx.fillText(this.text, this.x, this.y)
                canvas.toBlob(blob => {
                    resolve(blob)
                }, 'image/png')
            })
        }
    }
}
</script>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Roboto:300';
</style>
