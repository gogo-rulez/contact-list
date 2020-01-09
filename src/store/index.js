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
        ADD_TO_CONTACT_LIST (state, contactList) {
            state.contactList.push(contactList);
            state.entries = state.contactList[state.contactList.length-1].id;
            localStorage.setItem('contact_list', JSON.stringify(state.contactList));
        },

        CHANGE_CONTACT_LIST (state, contactList) {
            state.contactList = contactList;
            state.entries = state.contactList[state.contactList.length-1].id;
            localStorage.setItem('contact_list', JSON.stringify(state.contactList));
        },

        DELETE_CONTACT (state, contactID) {
            const entry = state.contactList.findIndex(x => x.id === contactID);
            state.contactList.splice(entry, 1);
            localStorage.setItem('contact_list', JSON.stringify(state.contactList));
        },

        TOGGLE_IS_FAVORITE (state, contactID) {
            const entry = state.contactList.findIndex(x => x.id === contactID);
            state.contactList[entry].isFavorite = !state.contactList[entry].isFavorite
            localStorage.setItem('contact_list', JSON.stringify(state.contactList));
        }
    },
    actions: {
        addToContactList ({ commit }, contactList) {
            commit ('ADD_TO_CONTACT_LIST', contactList);
        },

        changeContactList ({ commit }, contactList) {
            commit ('CHANGE_CONTACT_LIST', contactList);
        },

        deleteContact ({ commit }, contactID) {
            commit ('DELETE_CONTACT', contactID);
        },

        toggleIsFavorite ({ commit }, contactID) {
            commit ('TOGGLE_IS_FAVORITE', contactID)
        }
    },
    modules: {}
});
