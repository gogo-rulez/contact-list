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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ContactEntryInfo from '@/components/ContactEntryInfo';

export default {
    name: 'ContactEntryNew',

    components: {
        ContactEntryInfo
    },

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
                email: ''
            },
            previewImageSource: '',
        }
    },

    computed: {
        ...mapGetters(['getContactList', 'getContactListEntries'])
    },

    watch: {
        // watch when contactList changes in store
        // reset the data and the component
        getContactList () {
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
        }
    },

    methods: {
        ...mapActions(['addToContactList']),

        openBrowseWindow (e) {
            this.$refs['browse_btn'].click();
        },

        previewImage (e) {
            this.previewImageSource = URL.createObjectURL(e.target.files[0]);

            setTimeout(() => {
                this.getBase64Image(this.$refs['avatar_image']);
            }, 100);
        },

        // https://stackoverflow.com/questions/19183180/how-to-save-an-image-to-localstorage-and-display-it-on-the-next-page
        getBase64Image(img) {
            let canvas = document.createElement('canvas');
            canvas.width = this.$refs['avatar_image'].width;
            canvas.height = this.$refs['avatar_image'].height;

            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let dataURL = canvas.toDataURL('image/png');

            this.newContact.user_avatar = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
        },

        // remove choosen image
        removeImage () {
            this.previewImageSource = '';
            this.newContact.user_avatar = '';
        },

        // set contact id
        // send data to store
        saveUser () {

            if(!this.validateInput()) return;

            this.newContact.id = this.getContactListEntries + 1;
            this.addToContactList(this.newContact);
        },

        validateInput () {
            if(!this.newContact.full_name) {
                this.errors.full_name = 'This field is required.'
            } else if(!this.validFullName(this.newContact.full_name)) {
                this.errors.full_name = 'Enter Your first and last name.'
            } else {
                this.errors.full_name = '';
            }

            if(!this.newContact.email) {
                this.errors.email = 'This field is required.'
            } else if(!this.validEmail(this.newContact.email)) {
                this.errors.email = 'Enter a valid e-mail.'
            } else {
                this.errors.email = '';
            }

            if(this.errors.full_name || this.errors.email) return false;

            return true;
        },

        validFullName (fullName) {
            let regExp = /^([a-zA-ZčćžšđČĆŽŠĐ]{2,}(\s[a-zA-ZčćžšđČĆŽŠĐ]{2,})+)$/;

            return regExp.test(fullName);
        },

        validEmail (email) {
            let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return regExp.test(email);
        }
    }
};
</script>
