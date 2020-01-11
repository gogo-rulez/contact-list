import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        contactList: [],
        entries: 0,
        modalRole: '',
        modalIsActive: false,
        deleteContactWithId: null
    },
    getters: {
        getContactList: state => state.contactList,
        getContactListEntries: state => state.entries,
        getModalRole: state => state.modalRole,
        getModalActivity: state => state.modalIsActive,
        getContactToDelete: state => state.deleteContactWithId
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
        },

        EDIT_CONTACT (state, contactData) {
            const entry = state.contactList.findIndex(x => x.id === contactData.id);
            console.log('evo me', entry);
            state.contactList.splice(entry, 1, contactData);
            localStorage.setItem('contact_list', JSON.stringify(state.contactList));
        },

        OPEN_MODAL (state, modalRole) {
            state.modalRole = modalRole;

            if (modalRole) {
                state.modalIsActive = true;
            }
        },

        CLOSE_MODAL (state) {
            state.modalIsActive = false;
        },

        MARK_FOR_DELETION (state, contactID) {
            state.deleteContactWithId = contactID;
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
            commit ('TOGGLE_IS_FAVORITE', contactID);
        },

        editContact ({commit}, contactData) {
            commit ('EDIT_CONTACT', contactData);
        },

        openModal ({commit}, modalRole) {
            commit ('OPEN_MODAL', modalRole);
        },

        closeModal ({commit}) {
            commit ('CLOSE_MODAL');
        },

        markForDeletion ({commit}, contactID) {
            commit ('MARK_FOR_DELETION', contactID);
        }
    },
    modules: {}
});
