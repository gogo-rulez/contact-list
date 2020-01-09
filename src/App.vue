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
        console.log('GORAN 1', this.getContactList);
        if(localStorage.getItem('contact_list')) {
            let items = JSON.parse(localStorage.getItem('contact_list'));
            items.forEach(item => {
                this.saveContactList(item);
            });
            console.log('GORAN 2', this.getContactList);
        }
    },

    methods: {
        ...mapActions(['saveContactList']),
    }
};
</script>

<style lang="scss">
@import "./static/scss/main";
</style>
