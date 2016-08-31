<template>
    <div class='ui raised compact segment'>
        <div class='picker-container'>
            <div class='color-item' v-for='color in colors'
                :style='{background: color}'
                :class='{current: color === value}'
                @click.stop='value = color'
            ></div>
        </div>
    </div>
</template>

<script>
import { avatarColors } from '../utility/material-colors'

export default {
    data: () => ({
        colors: avatarColors
    }),
    props: {
        value: {
            type: String,
            required: true,
            twoWay: true
        }
    }
}
</script>

<style scoped>
.preview {
    height: 50px;
}
.color-item {
    width:  15px;
    height: 15px;
    margin: 1px;
    float: left;
}
.color-item.current {
    border: 2px solid rgba(0, 0, 0, 0.5);
}
.picker-container {
    width: 221px;
}
.picker-container:after {
    visibility: hidden;
    display: block;
    content: " ";
    clear: both;
    height: 0;
}
</style>