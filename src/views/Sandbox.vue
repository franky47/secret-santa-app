<template>
    <div>
        <div v-on-clickaway='text="You clicked away"' @click='text="You clicked me"'>
            <p>{{text}}</p>
        </div>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
    data: () => ({
        text: 'Click somewhere'
    }),
    mixins: [ clickaway ]
}
</script>
