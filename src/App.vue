<template>
<div id="app">

    <div :class="$route.name.toLowerCase()">

        <site-header></site-header>

        <router-view />

        <component
            v-if="modalIsActive"
            :is="modalComponent"
            :contact-to-delete="getContactToDelete"
        />

    </div>

</div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'App',

    components: {
        SiteHeader
    },

    data () {
        return {
            modalIsActive: false
        }
    },

    computed: {
        ...mapGetters(['getContactList', 'getModalRole', 'getModalActivity', 'getContactToDelete']),

        modalComponent () {
            return () => import(`@/components/modals/Modal${this.getModalRole}`);
        }
    },

    created () {
        if(this.getContactList.length) return;

        // load data from locale storage and push it to state.contactList
        if(localStorage.getItem('contact_list')) {
            let items = JSON.parse(localStorage.getItem('contact_list'));
            items.forEach(item => {
                this.addToContactList(item);
            });
        }
    },

    mounted () {

        this.$store.watch(() => this.getModalActivity, modalActive => {
            this.modalIsActive = modalActive;
        });
    },

    methods: {
        ...mapActions(['addToContactList', 'closeModal']),
    }
};
</script>

<style lang="scss">
@import "./static/scss/main";
</style>
