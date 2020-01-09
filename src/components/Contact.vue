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
                @click="deleteContact()"
            >
                <span class="icon icon-delete"></span>
            </a>
        </div>

    </li>
</template>

<script>
    export default {
        name: 'Contact',

        props: {
            id: [String, Number],
            img: String,
            name: String,
            isFavorite: Boolean,
        },

        data () {
            return {
                tempIsFavorite: null
            }
        },

        computed: {
            contactIsFavorite () {
                return this.tempIsFavorite ? 'icon icon-heart-full' : 'icon icon-heart-empty';
            }
        },

        mounted () {
            this.tempIsFavorite = this.isFavorite;
        },

        methods: {
            setFavoriteFlag () {
                let prevStorage = [];

                let items = JSON.parse(localStorage.getItem('contact_list'));
                items.forEach(item => {
                    if(item.id === this.id) {
                        item.isFavorite = !item.isFavorite;
                        this.tempIsFavorite = !this.tempIsFavorite;

                        if(!item.isFavorite) {
                            this.$emit('removeFromFavs');
                        }
                    }
                    prevStorage.push(item);
                });

                localStorage.setItem('contact_list', JSON.stringify(prevStorage));
            },

            deleteContact () {
                let prevStorage = [];

                let items = JSON.parse(localStorage.getItem('contact_list'));
                items.forEach(item => {
                    if(item.id === this.id) {
                        this.$refs['contact'].remove();
                    } else {
                        prevStorage.push(item);
                    }
                });

                localStorage.setItem('contact_list', JSON.stringify(prevStorage));
            }
        }
    }
</script>