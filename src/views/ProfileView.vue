<template>
    <div class='wrapper'>
        <h1>Edit Profile</h1>
        <form @submit.prevent='update' class='ui form' :class='{error: errorMessage}'>
            <!-- todo: add email and password -->
            <div class='field' :class='{error: check(validation.name)}'>
                <label>Name <span v-if='check(validation.name)'>is required</span></label>
                <input type='text' v-model='user.name' placeholder='eg: Santa Claus'>
            </div>
            <div class='field' v-if='user.name'
                style='user-select:none' unselectable='on'
                onselectstart='return false'
                onmousedown='return false'
            >
                <label>Avatar <i class='ui small grey icon refresh' @click='changeColor'></i></label>
                <!-- todo: add image & file upload here -->
            </div>
            <div class='ui error message'>
                <div class='header'>Error</div>
                <p>{{errorMessage}}</p>
            </div>
            <button class='ui basic green button' :class='{loading: loading}' type='submit'>
                <i class='fitted icons'>
                    <i class='icon user'></i>
                    <i class='corner add icon'></i>
                </i> Create Account
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        displayErrors: false,
        loading: false,
        user: {
            name: '',
            email: '',
            password: '',
            avatarColor: ''
        },
        errorMessage: ''
    })
}
</script>