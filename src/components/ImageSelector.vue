<!-- Credits to Jack Barham: https://jsfiddle.net/jackbarham/sxfept4t/1/ -->

<template>
    <div class='area'
         @dragenter.stop.prevent='onDragEnter'
         @dragleave='onDragLeave'
         @dragover.stop.prevent='onDragOver'
         @drop.stop.prevent='onDrop'
         @click.stop.prevent='onClick'
         :class='{hovered: hover}'
    >
        <i class='ui fitted huge angle down icon'></i>
    </div>
</template>

<script>
export default {
    data: () => ({
        hover: false
    }),
    props: {
        file: {
            type: window.File,
            default: () => null,
            twoWay: true
        }
    },
    methods: {
        onDragEnter(event) {
            this.hover = true
        },
        onDragLeave(event) {
            this.hover = false
        },
        onDragOver(event) {
            // Just here for preventDefault, to mark div as drop zone.
        },
        onDrop(event) {
            this.onFileChange(event)
        },
        onClick() {
            const input = document.createElement('input')
            input.type     = 'file'
            input.accept   = 'image/*'
            input.onchange = this.onFileChange
            input.click()
        },
        onFileChange(event) {
            const files = event.target.files || event.dataTransfer.files
            if (files.length > 0) {
                const file = files[0]
                if (file.type.match(/^image\/.*$/)) {
                    this.file = file
                }
            }
            this.hover = false
        },
        removeImage() {
            this.file  = null
        }
    }
}
</script>

<style scoped lang='scss'>
$colorIdle:     #cbcbcb;
$colorActive:   #2e94c4;

.area {
    width: 100%;
    height: 100%;
    border: 1px dashed $colorIdle;
    border-radius: 100%;
    color: darken($colorIdle, 15%);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: all 0.3s ease-out;
    &.hovered, &:hover {
        border: 1px dashed $colorActive;
        color: darken($colorActive, 10%);
    }
    p {
        margin: 15px 0 10px 0;
        padding: 0 5px;
        text-align: center;
    }
    i {
        margin: -20px;
    }
}
</style>
