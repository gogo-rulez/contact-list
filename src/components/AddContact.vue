<template>

    <router-link
        :to="{ name: 'ContactEntryNew' }"
        class="add_contact"
    >
        <span class="icon icon-add"></span>
        <p>Add new</p>
    </router-link>

</template>

<script>
    export default {
        name: 'AddContact'
    }
</script>