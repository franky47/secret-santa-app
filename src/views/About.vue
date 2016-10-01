<template>
    <div>
        <p>Git revision: <a :href='commitURL'>{{revision}}</a> - {{message}}</p>
    </div>
</template>

<script>
export default {
    data: () => ({
        revision:   __git__.revision,
        message:    __git__.message
    }),
    computed: {
        commitURL() {
            return `https://github.com/Franky47/secret-santa-app/commit/${this.revision}`
        }
    }
}
</script>
