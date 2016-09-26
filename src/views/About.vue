<template>
    <div>
        <p>Git revision: {{ revision }}</p>
        <p>Git message: {{ message }}</p>
    </div>
</template>

<script>
export default {
    data: () => ({
        revision:   null,
        message:    null
    })
}
</script>
