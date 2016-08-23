<template>
    <div class='wrapper'>
        <!--div class='ui vertical tabular menu'>

        </div>
        <div class="ui grid">
  <div class="four wide column">
    <div class="ui vertical mini fluid tabular menu">
      <a class='item active'><i class='icon info'></i> Account Info</a>
            <a class='item'><i class='icon at'></i> Change Email</a>
            <a class='item'><i class='icon lock'></i> Change Password</a>
            <a class='item'><i class='icon trash'></i> Delete Account</a>
    </div>
  </div>
  <div class="twelve wide stretched column">
    <div class="ui segment">
      This is an stretched grid column. This segment will always match the tab height
    </div>
  </div>
</div-->

        <h1>Edit Profile</h1>
        <form @submit.prevent='update' class='ui form' :class='{error: errorMessage}'>
            <email :value.sync='user.email' placeholder=''></email>
            <password :value.sync='user.password' placeholder=''></password>
            <name :value.sync='user.name'></name>
            <div class='field'
                style='user-select:none' unselectable='on'
                onselectstart='return false'
                onmousedown='return false'
            >
                <label>Avatar</label>
                <!-- todo: add image & file upload here -->
            </div>
            <delete-account></delete-account>
            <div class='ui error message'>
                <div class='header'>Error</div>
                <p>{{errorMessage}}</p>
            </div>
            <button class='ui basic green button' :class='{loading: loading}' type='submit'>
                <i class='fitted icon checkmark'></i> Update
            </button>
        </form>
    </div>
</template>

<script>
import Email            from '../components/form/Email'
import Password         from '../components/form/Password'
import Name             from '../components/form/Name'
import DeleteAccount    from '../components/form/DeleteAccountButton'

export default {
    data: () => ({
        showErrors: false,
        loading: false,
        user: {
            name: '',
            email: '',
            password: '',
            avatarColor: ''
        },
        errorMessage: ''
    }),
    components: { Email, Password, Name, DeleteAccount }
}
</script>