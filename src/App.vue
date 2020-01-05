<template>
<div id="app">

    <site-header></site-header>

    <router-view />

</div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader';

export default {
    name: 'App',

    components: {
        SiteHeader
    }
};
</script>

<style lang="scss">
@import "static/scss/main.scss";
</style>
