<template>
<div id="app">

    <site-header></site-header>

    <router-view />

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

    computed: {
        ...mapGetters(['getContactList'])
    },

    created () {
        console.log(this.getContactList);
        if(this.getContactList.length) return;

        if(localStorage.getItem('contact_list')) {
            let items = JSON.parse(localStorage.getItem('contact_list'));
            items.forEach(item => {
                this.addToContactList(item);
            });
        }
    },

    methods: {
        ...mapActions(['addToContactList']),
    }
};
</script>

<style lang="scss">
@import "./static/scss/main";
</style>
