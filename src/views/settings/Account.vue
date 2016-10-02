<template>
    <div>
        <h2>Manage your account</h2>
        <update-email></update-email>
        <update-password></update-password>
        <delete-account></delete-account>
    </div>
</template>

<script>
import UpdateEmail    from './account/Email'
import UpdatePassword from './account/Password'
import DeleteAccount  from './account/DeleteAccount'

export default {
    data: () => ({

    }),
    components: { UpdateEmail, UpdatePassword, DeleteAccount },
    route: {
        data: function() {
            // todo: pass to child
            console.log('data-account')
        }
    }
}
</script>

<style>
.focus.matching {
    border-color: green;
}
</style>
