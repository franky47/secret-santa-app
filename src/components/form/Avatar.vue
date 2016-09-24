<template>
    <div class='field'>
        <label>Avatar
            <span v-if='file' class='action' @click='removeImage'>
                <i class='fitted remove icon'></i>
            </span>
        </label>
        <div :style='avatarArea'>
            <image-selector v-if='!file' :file.sync='file' v-ref:select></image-selector>
            <image-crop :size='size' v-if='file' :file='file' v-ref:crop></image-crop>
        </div>
        <generic-avatar :size='size' :text='letter' style='display:none' v-ref:generic></generic-avatar>
    </div>
</template>

<script>
import Vue from 'vue'
import ImageSelector    from '../ImageSelector'
import ImageCrop        from '../ImageCrop'
import GenericAvatar    from '../GenericAvatar'
import { avatarColors } from '../../utility/material-colors'

export default {
    data: () => ({
        file: null,
        size: 150
    }),
    components: { ImageSelector, ImageCrop, GenericAvatar },
    props: {
        userName: {
            type: String,
            default: ''
        },
        photoURL: {
            type: String,
            default: null,
            twoWay: true
        }
    },
    computed: {
        letter() {
            return this.userName[0] || ''
        },
        avatarArea() {
            return {
                width:  `${this.size}px`,
                height: `${this.size}px`
            }
        }
    },
    watch: {
        photoURL() {
            if (this.photoURL) {
                this.$refs.crop.loadImageFromURL(this.photoURL)
                this.file = this.photoURL
            }
        }
    },
    methods: {
        getImageAsFile() {
            if (this.file) {
                return this.$refs.crop.getImageAsFile()
            } else {
                return this.generateGenericAvatar()
            }
        },
        generateGenericAvatar() {
            return new Promise((resolve, reject) => {
                const pick = array => array[Math.floor(Math.random() * array.length)]
                const color = pick(avatarColors)
                this.$refs.generic.backColor = color
                this.$refs.generic.textColor = 'rgba(255, 255, 255, 0.9)'
                Vue.nextTick(() => {
                    resolve() // Wait for component changes to be propagated
                })
            }).then(() => {
                return this.$refs.generic.getAsFile()
            })
        },
        removeImage() {
            this.file = null
        }
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
.action {
    cursor: pointer;
    font-style: italic;
    font-weight: 100;
    color: #888;
}
</style>
