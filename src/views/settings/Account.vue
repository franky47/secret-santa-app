<template>
    <h2>Manage your account</h2>
    <update-email></update-email>
    <update-password></update-password>
    <div class='ui segments'>
        <div class='ui red segment header'>
            <h4><i class='ui fitted warning sign icon'></i>Danger Zone</h4>
        </div>
        <div class='ui segment'>
            <delete-account-button></delete-account-button>
        </div>
        <div class='ui bottom attached error message' v-if='errors.deleteAccount'>
            <i class='fitted warning circle icon'></i> {{errors.deleteAccount}}
        </div>
    </div>
</template>

<script>
import UpdateEmail    from './account/Email'
import UpdatePassword from './account/Password'
import DeleteAccountButton from '../../components/form/DeleteAccountButton'

export default {
    data: () => ({

    }),
    components: { UpdateEmail, UpdatePassword, DeleteAccountButton }
}
</script>

<style>
.focus.matching {
    border-color: green;
}
</style>
