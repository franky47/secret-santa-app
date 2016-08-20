<template>
    <div class='wrapper'>
        <h1>Create New Account</h1>
        <register></register>
    </div>
</template>

<script>
import Register from '../../components/Register'
export default {
    components: {
        Register
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 450px;
    min-width: 292px;
    margin: 50px auto;
}
</style>