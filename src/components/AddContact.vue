<template>

    <router-link
        :to="{ name: 'NewContact' }"
        class="add_contact"
    >
        <span class="icon icon-add"></span>
        <p>Add new</p>
    </router-link>

</template>

<script>
    export default {
        name: "AddContact"
    }
</script>