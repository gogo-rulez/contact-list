<template>

    <div
        v-if="contactReady"
        class="contact_entry">

        <div class="contact_entry__headline">
            <router-link
                :to="{ name: 'Home' }"
                class="contact_entry__back_btn"
            >
                <span class="icon icon-arrow-back"></span>
            </router-link>

            <a
                role="button"
                class="contact_entry__delete_btn"
                @click="openModal('Delete')"
            >
                <p>Delete</p>
                <span class="icon icon-delete"></span>
            </a>
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

    <div v-else class="contact_entry">
        <p class="contact_entry__no_info">There is no info for this contact!</p>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ContactEntryInfo from '@/components/ContactEntryInfo';
import {contactEntryMixin} from '@/mixins/contactEntryMixin';

export default {
    name: 'ContactEntryEdit',

    components: {
        ContactEntryInfo
    },

    mixins: [contactEntryMixin],

    data () {
        return {
            newContact: {
                id: null,
                user_avatar: '',
                full_name: '',
                email: '',
                numbers: [],
                isFavorite: false
            },
            errors: {
                email: '',
                full_name: '',
                numbers: []
            },
            contactReady: false,
            previewImageSource: '',
        }
    },

    mounted () {
        this.newContact = this.getContactList.find(x => x.id === Number(this.$route.params.id));

        if(!this.newContact) return false;

        if(this.newContact.user_avatar) {
            this.previewImageSource = `data:image/png;base64,${this.newContact.user_avatar}`;
        }

        this.contactReady = true;
    },

    methods: {
        ...mapActions(['editContact', 'openModal']),

        // send data to store
        saveUser () {
            if(!this.validateInput()) return false;
            this.editContact(this.newContact);
        },
    }
};
</script>
