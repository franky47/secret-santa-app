<template>
    <div class='ui two column doubling grid'>
        <div class='ui centered column'>
            <div class='ui padded raised segment'>
                <h3>Reset your password</h3>
                <form class='ui form'>
                    <email></email>
                    <button class='ui fluid primary button'>
                        <i class='fitted mail icon'></i>Send password reset email
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Email from '../../components/form/Email'

export default {
    data: () => ({

    }),
    components: { Email }
}
</script>
