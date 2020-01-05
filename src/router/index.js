import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Favorites from "../views/Favorites.vue";
import CreateContact from "../views/CreateContact.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites
    },
    {
        path: '/create-contact',
        name: 'CreateContact',
        component: CreateContact
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
