<template>

    <router-link
        :to="{ name: 'CreateContact' }"
        class="new_contact"
    >
        <span class="icon icon-add"></span>
        <p>Add new</p>
    </router-link>

</template>

<script>
    export default {
        name: "NewContact"
    }
</script>