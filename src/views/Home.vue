<template>
    <div>
        <search-bar />
        <add-contact />
        <contact-list />
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar';
import AddContact from '@/components/AddContact';
import ContactList from '@/components/ContactList';

export default {
    name: 'Home',
    components: {
        SearchBar,
        AddContact,
        ContactList
    }
};
</script>

<style module>
</style>
