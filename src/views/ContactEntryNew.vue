<template>
    <div
        :key="nextContactId"
        class="contact_entry">
        <div class="contact_entry__headline">
            <router-link
                :to="{ name: 'Home' }"
                class="contact_entry__back_btn"
            >
                <span class="icon icon-arrow-back"></span>
            </router-link>
        </div>

        <div class="contact_entry__avatar">

            <div
                v-if="previewImageSource"
                class="contact_entry__image_wrap"
                @click="removeImage()"
            >
                <figure class="contact_entry__image_figure">
                    <img ref="avatar_image" :src="previewImageSource" alt="">
                </figure>

                <span class="icon icon-x"></span>
                <input
                    v-model="newContact.user_avatar"
                    type="text">
            </div>

            <div
                v-else
                class="contact_entry__avatar_upload"
                @click="openBrowseWindow()">
                <span class="icon icon-upload"></span>
            </div>

            <input
                ref="browse_btn"
                type="file"
                class="contact_entry__avatar_input"
                @change="previewImage($event)">
        </div>

        <div class="contact_entry__inner_wrap">

            <contact-entry-info
                :model="newContact.full_name"
                :error="errors.full_name"
                input-name="full_name"
                label="full name"
                icon-name="person"
                placeholder="Full name"
                @modelValue="newContact.full_name = $event"
            />

            <contact-entry-info
                :model="newContact.email"
                :error="errors.email"
                input-name="email"
                label="email"
                icon-name="email"
                placeholder="Email"
                @modelValue="newContact.email = $event"
            />

            <contact-entry-info
                :model="newContact.numbers"
                :error="errors.numbers"
                input-name="numbers"
                label="numbers"
                icon-name="phone"
                placeholder="Number"
                :multipleInputs="true"
                @numbers="newContact.numbers = $event"
            />

            <div class="contact_entry__buttons_wrap">
                <router-link
                    :to="{ name: 'Home' }"
                    class="btn is-grey"
                >
                    Cancel
                </router-link>

                <a
                    role="button"
                    class="btn is-green"
                    @click="saveUser()"
                >
                    Save
                </a>
            </div>

        </div>


    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ContactEntryInfo from '@/components/ContactEntryInfo';
import {contactEntryMixin} from '@/mixins/contactEntryMixin';

export default {
    name: 'ContactEntryNew',

    components: {
        ContactEntryInfo
    },

    mixins: [contactEntryMixin],

    data () {
        return {
            nextContactId: null,
            newContact: {
                id: null,
                user_avatar: '',
                full_name: '',
                email: '',
                numbers: [],
                isFavorite: false
            },
            errors: {
                full_name: '',
                email: '',
                numbers: []
            },
            previewImageSource: '',
        }
    },

    mounted () {

        // watch when contactList changes in store
        // reset the data and the component
        this.$store.watch(() => this.getContactListEntries, entries => {
            this.newContact = {
                id: null,
                user_avatar: '',
                full_name: '',
                email: '',
                numbers: [],
                isFavorite: false
            };

            this.previewImageSource = '';
            this.nextContactId = this.getContactListEntries + 1;
        });
    },

    methods: {
        ...mapActions(['addToContactList']),

        // set contact id
        // send data to store
        saveUser () {

            if(!this.validateInput()) return;

            this.newContact.id = this.getContactListEntries + 1;
            this.addToContactList(this.newContact);
        },

    }
};
</script>
