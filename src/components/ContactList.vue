<template>
    <ul
        v-if="contactsReady"
        class="contact__list">

        <contact
            v-if="!favoritesPage"
            :add-new-contact="true"
        />

        <template v-for="contact in contacts">

            <template v-if="favoritesPage">
                <contact
                    v-if="contact.isFavorite"
                    :ref="`contact_${contact.id}`"
                    :key="contact.id"
                    :id="contact.id"
                    :user-avatar="contact.user_avatar"
                    :full-name="contact.full_name"
                    :is-favorite="contact.isFavorite"
                    :favorites-page="favoritesPage"
                />
            </template>

            <template v-else>
                <contact
                    :key="contact.id"
                    :id="contact.id"
                    :user-avatar="contact.user_avatar"
                    :full-name="contact.full_name"
                    :is-favorite="contact.isFavorite"
                />
            </template>

        </template>
    </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Contact from '@/components/Contact';

export default {
    name: 'ContactList',

    props: {
        favoritesPage: Boolean,
        searchFilter: String
    },

    components: {
        Contact
    },

    data () {
        return {
            contacts: [],
            contactsReady: false
        }
    },

    mounted () {
        // this.loadContacts();
        this.contactsReady = true;
        this.contacts = this.getContactList;
    },

    watch: {
        searchFilter (value) {
            if (value) {
                this.contacts = this.getContactList.filter(x => {
                    let fullName = x.full_name.toLowerCase();
                    let query = value.toLowerCase();
                    return fullName.includes(query);
                });
            } else {
                this.contacts = this.getContactList;
            }
        }
    },

    computed: {
        ...mapGetters(['getContactList', 'getContactListEntries'])
    },
}
</script>