<template>
    <div
        v-if="contactReady"
        class="contact_detail">
        <div class="contact_detail__headline">
            <router-link
                :to="{ name: 'Home' }"
                class="contact_detail__back_btn"
            >
                <span class="icon icon-arrow-back"></span>
            </router-link>

            <div class="contact_detail__options_wrap">
                <a
                    role="button"
                    class="contact_detail__favorite_btn"
                    @click="setFavoriteFlag()"
                >
                    <span :class="contactIsFavorite"></span>
                </a>

                <router-link
                    :to="{name: 'ContactEntryEdit', params: {id: $route.params.id}}"
                    role="button"
                    class="contact_detail__edit_btn"
                >
                    <span class="icon icon-edit"></span>
                </router-link>
            </div>

        </div>


        <div class="contact_detail__outer_wrap">

            <div class="contact_detail__header">

                <figure class="contact_detail__user_avatar">
                    <img v-if="contact.user_avatar" :src="`data:image/png;base64,${contact.user_avatar}`" :alt="contact.full_name">
                    <span v-else class="icon icon-person"></span>
                </figure>

                <div class="contact_detail__name_wrap">

                    <router-link
                        :to="{ name: 'Home' }"
                        class="contact_detail__back_btn contact_detail__back_btn--desktop"
                    >
                        <span class="icon icon-arrow-back"></span>
                    </router-link>

                    <h2 class="contact_detail__user_name">{{ contact.full_name }}</h2>

                    <div class="contact_detail__options_wrap contact_detail__options_wrap--desktop">
                        <a
                            role="button"
                            class="contact_detail__favorite_btn"
                            @click="setFavoriteFlag()"
                        >
                            <span :class="contactIsFavorite"></span>
                        </a>

                        <router-link
                            :to="{name: 'ContactEntryEdit', params: {id: $route.params.id}}"
                            role="button"
                            class="contact_detail__edit_btn contact_detail__edit_btn--desktop"
                        >
                            <span class="icon icon-edit"></span>
                        </router-link>
                    </div>

                </div>

            </div>

            <div class="contact_detail__inner_wrap">

                <div class="contact_detail__contact_info">
                    <div class="contact_detail__label">
                        <span class="icon icon-email"></span>
                        <p>email</p>
                    </div>
                    <p class="contact_detail__value">{{ contact.email }}</p>
                </div>

                <div class="contact_detail__contact_info">
                    <div class="contact_detail__label">
                        <span class="icon icon-phone"></span>
                        <p>numbers</p>
                    </div>
                    <ul v-if="contact.numbers" class="contact_detail__value_list">
                        <li class="contact_detail__value_item">
                            <span
                                v-for="number in contact.numbers"
                                :key="number.label"
                            >
                                {{ number.label }}
                            </span>
                        </li>

                        <li class="contact_detail__value_item">
                            <a
                                v-for="number in contact.numbers"
                                :key="number.number"
                                :href="`tel:${number.number}`"
                            >
                                {{ number.number }}
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'ContactDetail',

    data () {
        return {
            contact: {},
            contactReady: false
        }
    },

    computed: {
        ...mapGetters(['getContactList']),

        contactIsFavorite () {
            return this.contact.isFavorite ? 'icon icon-heart-full' : 'icon icon-heart-empty';
        }
    },

    mounted () {
        this.contact = this.getContactList.find(x => x.id === Number(this.$route.params.id));
        this.contactReady = true;
    },

    methods: {
        ...mapActions(['markForDeletion', 'toggleIsFavorite', 'openModal']),

        setFavoriteFlag () {
            this.toggleIsFavorite(this.contact.id);

        },

        removeContact () {
            this.markForDeletion(this.id);
            this.openModal('Delete');
        }
    }
};
</script>
