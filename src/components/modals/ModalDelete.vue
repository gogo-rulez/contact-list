<template>

    <div class="modal modal--delete">

        <div class="modal__overlay" />

        <div class="modal__window">
            <header class="modal__header">
                <p class="modal__title">Delete</p>
            </header>

            <div class="modal__content">

                <p>Are you sure you want to delete this contact?</p>

                <div class="modal__btn_wrap">

                    <a
                        role="button"
                        class="btn is-green"
                        @click="removeContact()"
                    >
                        Delete
                    </a>

                    <a
                        role="button"
                        class="btn is-grey"
                        @click="closeModal()"
                    >
                        Cancel
                    </a>

                </div>

            </div>


        </div>


    </div>

</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'ModalDelete',

    props: {
        contactToDelete: Number
    },

    methods: {
        ...mapActions(['closeModal', 'deleteContact']),

        removeContact () {
            const contactID = this.contactToDelete || this.$route.params.id;
            this.deleteContact(contactID);
            this.closeModal();

            if(this.$route.name === 'Home') return;

            this.$router.push({name: 'Home'});
        }
    }
}
</script>