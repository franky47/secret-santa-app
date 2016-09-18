<template>
    <div v-if='!image'>
        <div class='dropzone-area'
             drag-over='handleDragOver'
             @dragenter='hover=true'
             @dragleave='hover=false'
             :class='{hovered: hover}'
        >
            <div class='dropzone-text'>
                <span class='dropzone-title'>Drop image here or click to select</span>
                <span class='dropzone-info' v-if='help'>{{ help }}</span>
            </div>
            <input type='file' @change='onFileChange'>
        </div>
    </div>
    <div class='dropzone-preview' v-if='image'>
        <img :src='image' />
        <button @click='removeImage'>Remove</button>
    </div>
</template>

<script>
export default {
    data: () => ({
        blob: null,
        image: null,
        hover: false
    }),
    methods: {
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files
            if (!files.length) {
                return
            }
            this.blob = files[0]
            this.createImage(this.blob)
        },
        createImage(blob) {
            const reader = new window.FileReader()
            reader.onload = (e) => {
                this.image = e.target.result
            }
            reader.readAsDataURL(blob)
        },
        removeImage() {
            this.blob  = null
            this.image = null
        }
    }
}
</script>

<style scoped lang='scss'>
.dropzone-area {
    width: 80%;
    height: 200px;
    position: relative;
    border: 2px dashed #CBCBCB;
    &.hovered {
        border: 2px dashed #2E94C4;
        .dropzone-title {
          color: #1975A0;
        }

    }
}

.dropzone-area input {
    position: absolute;
    cursor: pointer;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.dropzone-text {
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translate(0, -50%);
    width: 100%;
    span {
        display: block;
        font-family: Arial, Helvetica;
        line-height: 1.9;
    }
}

.dropzone-title {
    font-size: 13px;
    color: #787878;
    letter-spacing: 0.4px;
}
.dropzone-info {
    font-size: 13px;
    font-size: 0.8125rem;
    color: #A8A8A8;
    letter-spacing: 0.4px;
}

.dropzone-button {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
}

.dropzone-preview {
    width: 80%;
    position: relative;
    &:hover .dropzone-button {
        display: block;
    }
    img {
      display: block;
      height: auto;
      max-width: 100%;
    }

}
</style>
