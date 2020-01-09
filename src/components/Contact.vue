<template>
    <li
        ref="contact"
        class="contact">

        <figure class="contact__avatar">
            <img :src="`data:image/png;base64,${img}`" :alt="name">
        </figure>

        <p class="contact__name">{{ name }}</p>

        <div class="contact__options_wrap">
            <a
                role="button"
                class="contact__option contact__option--favorite"
                @click="setFavoriteFlag()"
            >
                <span :class="contactIsFavorite"></span>
            </a>
            <a role="button" class="contact__option contact__option--edit">
                <span class="icon icon-edit"></span>
            </a>
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

export default {
    name: 'Contact',

    props: {
        id: [String, Number],
        img: String,
        name: String,
        isFavorite: Boolean,
        onlyFavorites: Boolean,
        favoritesPage: Boolean
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
        ...mapActions(['changeContactList', 'deleteContact', 'toggleIsFavorite']),

        setFavoriteFlag () {
            this.toggleIsFavorite(this.id);

        },

        removeContact () {
            this.deleteContact(this.id);
        }
    }
}
</script>