<template>
    <div>
        <search-bar
            :model="searchQuery"
            @searchInputValue="searchFilter = $event"
        />
        <div class="contact__list_wrap">
            <contact-list
                :favorites-page="true"
                :search-filter="searchFilter"
            />
        </div>
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
    },

    data () {
        return {
            searchQuery: '',
            searchFilter: ''
        }
    }
};
</script>