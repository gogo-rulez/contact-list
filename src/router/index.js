import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Favorites from "../views/Favorites.vue";
import ContactEntryNew from "../views/ContactEntryNew.vue";
import ContactEntryEdit from "../views/ContactEntryEdit.vue";
import ContactDetail from "../views/ContactDetail.vue";

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
        name: 'ContactEntryNew',
        component: ContactEntryNew
    },
    {
        path: '/edit-contact/:id(\\d+)',
        name: 'ContactEntryEdit',
        component: ContactEntryEdit
    },
    {
        path: '/contact/:id(\\d+)',
        name: 'ContactDetail',
        component: ContactDetail
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
