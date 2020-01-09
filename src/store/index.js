import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        contactList: [],
        entries: 0
    },
    getters: {
        getContactList: state => state.contactList,
        getContactListEntries: state => state.entries
    },
    mutations: {
        SAVE_CONTACT_LIST (state, contactList) {
            console.log('from state', contactList);
            state.contactList.push(contactList);
            state.entries = state.contactList.length;
            localStorage.setItem('contact_list', JSON.stringify(state.contactList));
        },
    },
    actions: {
        saveContactList ({ commit }, contactList) {
            commit ('SAVE_CONTACT_LIST', contactList);
            console.log('evo me', contactList);
        },
    },
    modules: {}
});
