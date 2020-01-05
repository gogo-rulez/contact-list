<template>
    <li class="contact">

        <figure class="contact__avatar">
            <img :src="img" :alt="name">
        </figure>

        <p class="contact__name">{{ name }}</p>

        <div class="contact__options_wrap">
            <a role="button" class="contact__option contact__option--favorite">
                <span :class="contactIsFavorite"></span>
            </a>
            <a role="button" class="contact__option contact__option--edit">
                <span class="icon icon-edit"></span>
            </a>
            <a role="button" class="contact__option contact__option--delete">
                <span class="icon icon-delete"></span>
            </a>
        </div>

    </li>
</template>

<script>
    export default {
        name: 'Contact',

        props: {
            id: String,
            img: String,
            name: String,
            isFavorite: Boolean,
        },

        computed: {
            contactIsFavorite () {
                return this.isFavorite ? 'icon icon-heart-full' : 'icon icon-heart-empty';
            }
        }
    }
</script>