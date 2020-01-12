<template>

    <router-link
        :to="{ name: 'ContactEntryNew' }"
        :class="`add_contact add_contact--${platform}`"
    >
        <span class="icon icon-add"></span>
        <p>Add new</p>
    </router-link>

</template>

<script>
    export default {
        name: 'AddContact',

        props: {
            platform: String
        }
    }
</script>