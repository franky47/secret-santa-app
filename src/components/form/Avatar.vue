<template>
    <div class='field'>
        <label>Avatar
            <span v-if='file' class='action' @click='removeImage'>
                <i class='fitted remove icon'></i>
            </span>
        </label>
        <div class='avatar-area'>
            <image-selector v-if='!file' :file.sync='file' v-ref:select></image-selector>
            <image-crop :size='150' v-if='file' :file='file' v-ref:crop></image-crop>
        </div>
    </div>
</template>

<script>
import ImageSelector    from '../ImageSelector'
import ImageCrop        from '../ImageCrop'

export default {
    data: () => ({
        file: null
    }),
    components: { ImageSelector, ImageCrop },
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
            return this.$refs.crop.getImageAsFile()
        },
        removeImage() {
            this.file = null
        }
    }
}
</script>

<style scoped>
.avatar-area {
    width:  150px;
    height: 150px;
}
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
