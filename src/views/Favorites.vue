<template>
    <div>
        <search-bar />
        <contact-list
            :only-favorites="true"
        />
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
</style>
