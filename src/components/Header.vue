<template>
    <div class='ui top fixed borderless menu'>
        <div class='ui container'>
            <div class='red header item'>
                <i class='large fitted gift icon'></i>
                Secret Santa
            </div>
        </div>

        <!-- h1 class='ui left floated red header'>
            <i class='gift icon'></i>
            <div class='content'>Secret Santa</div>
        </h1 -->
        <user-session class='userSession'></user-session>
    </div>
</template>

<script>
import UserSession from './UserSession'

export default {
    components: {
        UserSession
    }
}
</script>

<style scoped>
.userSession {
    margin-top: 8px;
}
.red.header.item {
    float: left;
    color: #d00;
    font-size: 1.2em;
    padding: 0.6em 0 0.6em 0;
}
</style>
