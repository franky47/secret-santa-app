<template>
    <sign-in class='wrapper'></sign-in>
</template>

<script>
import SignIn from '../../components/SignIn'
export default {
    components: {
        SignIn
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 450px;
    min-width: 360px;
    margin: 130px auto;
}
</style>