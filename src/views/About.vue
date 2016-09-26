<template>
    <div>
        <p>Git revision: {{ revision }}</p>
        <p>Git message: {{ message }}</p>
    </div>
</template>

<script>
export default {
    data: () => ({
        revision:   __git__.revision,
        message:    __git__.message
    })
}
</script>
