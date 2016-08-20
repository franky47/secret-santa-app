<template>
    <div id='wrapper' class="ui vertical clearing segment">
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
    margin-top: 8px;
}
#wrapper {
    padding-bottom: 3px;
    border-bottom: 1px solid rgba(150, 10, 10, 0.1);
}
</style>
