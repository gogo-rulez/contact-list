<template>
    <div>
        <search-bar></search-bar>
        <contact-list></contact-list>
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar';
import ContactList from '@/components/ContactList';

export default {
    name: 'Favorites',
    components: {
        SearchBar,
        ContactList
    }
};
</script>

<style lang="scss">
@import "static/scss/views/home.scss";
</style>
