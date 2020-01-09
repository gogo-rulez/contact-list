<template>
    <div>
        <search-bar
            :model="searchQuery"
            @searchInputValue="searchFilter = $event"
        />
        <add-contact />
        <contact-list
            :search-filter="searchFilter"
        />
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
    },

    data () {
        return {
            searchQuery: '',
            searchFilter: ''
        }
    }
};
</script>
