<template>
    <div class="ui vertical clearing segment">
        <h1 class="ui left floated red header">
            <i class="gift icon"></i>
            <div class="content">Secret Santa
                <div class="sub header">Santa as a Service</div>
            </div>
        </h1>
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
    margin-top: 15px;
}
</style>
