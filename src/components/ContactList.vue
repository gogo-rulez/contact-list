<template>
    <ul
        v-if="contactsReady"
        class="contact__list">
        <template v-for="contact in contacts">

            <template v-if="onlyFavorites">
                <contact
                    v-if="contact.isFavorite"
                    :ref="`contact_${contact.id}`"
                    :key="contact.id"
                    :id="contact.id"
                    :img="contact.user_avatar"
                    :name="contact.full_name"
                    :isFavorite="contact.isFavorite"
                    @removeFromFavs="removeFavContact(`contact_${contact.id}`)"
                />
            </template>

            <template v-else>
                <contact
                    :key="contact.id"
                    :id="contact.id"
                    :img="contact.user_avatar"
                    :name="contact.full_name"
                    :isFavorite="contact.isFavorite"
                />
            </template>

        </template>
    </ul>
</template>

<script>
    import Contact from '@/components/Contact';
    export default {
        name: 'ContactList',

        props: {
            onlyFavorites: Boolean
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
            this.loadContacts();
        },

        methods: {
            loadContacts () {
                if(localStorage.getItem('contact_list')) {
                    this.contacts = JSON.parse(localStorage.getItem('contact_list'));
                    console.log(this.contacts);
                    this.contactsReady = true;
                }
            },

            removeFavContact (ref) {
                console.log(ref);
                console.log(this.$refs.ref);
                this.$refs.ref.remove();
            }
        }
    }
</script>