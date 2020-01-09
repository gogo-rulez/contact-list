import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Favorites from "../views/Favorites.vue";
import NewContact from "../views/NewContact.vue";

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
        path: '/new-contact',
        name: 'NewContact',
        component: NewContact
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
