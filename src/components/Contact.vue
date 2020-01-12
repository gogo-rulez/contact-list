<template>
    <li
        v-if="addNewContact"
        class="contact contact--add_new"
    >
        <add-contact
            platform="desktop"
        />
    </li>

    <li
        v-else
        ref="contact"
        class="contact">

        <router-link
            :to="{name: 'ContactDetail', params: {id: id}}"
            class="contact__link"
        >

            <figure class="contact__avatar">
                <img v-if="userAvatar" :src="`data:image/png;base64,${userAvatar}`" :alt="fullName">
                <span v-else class="icon icon-person"></span>
            </figure>

            <p class="contact__name">{{ fullName }}</p>

        </router-link>

        <div class="contact__options_wrap">
            <a
                role="button"
                class="contact__option contact__option--favorite"
                @click="setFavoriteFlag()"
            >
                <span :class="contactIsFavorite"></span>
            </a>
            <router-link
                :to="{name: 'ContactEntryEdit', params:{id: id}}"
                class="contact__option contact__option--edit"
            >
                <span class="icon icon-edit"></span>
            </router-link>
            <a
                role="button"
                class="contact__option contact__option--delete"
                @click="removeContact()"
            >
                <span class="icon icon-delete"></span>
            </a>
        </div>

    </li>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import AddContact from '@/components/AddContact';

export default {
    name: 'Contact',

    props: {
        id: [String, Number],
        userAvatar: String,
        fullName: String,
        isFavorite: Boolean,
        favoritesPage: Boolean,
        addNewContact: Boolean
    },

    components: {
        AddContact
    },

    data () {
        return {
            tempIsFavorite: null
        }
    },

    computed: {
        ...mapGetters(['getContactList']),

        contactIsFavorite () {
            return this.isFavorite ? 'icon icon-heart-full' : 'icon icon-heart-empty';
        }
    },

    mounted () {
        this.tempIsFavorite = this.isFavorite;
    },

    methods: {
        ...mapActions(['markForDeletion', 'toggleIsFavorite', 'openModal']),

        setFavoriteFlag () {
            this.toggleIsFavorite(this.id);

        },

        removeContact () {
            this.markForDeletion(this.id);
            this.openModal('Delete');
        }
    }
}
</script>