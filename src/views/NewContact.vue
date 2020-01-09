<template>
    <div
        :key="nextContactId"
        class="new_contact">
        <div class="new_contact__headline">
            <router-link
                :to="{ name: 'Home' }"
                class="new_contact__back_btn"
            >
                <span class="icon icon-arrow-back"></span>
            </router-link>
        </div>

        <div class="new_contact__avatar">

            <div
                v-if="previewImageSource"
                class="new_contact__image_wrap"
                @click="openBrowseWindow()"
            >
                <img ref="avatar_image" :src="previewImageSource" alt="">
                <span class="icon icon-x"></span>
                <input
                    v-model="newContact.user_avatar"
                    type="text">
            </div>

            <div
                v-else
                class="new_contact__avatar_upload"
                @click="openBrowseWindow()">
                <span class="icon icon-upload"></span>
            </div>

            <input
                ref="browse_btn"
                type="file"
                class="new_contact__avatar_input"
                @change="previewImage($event)">
        </div>

        <new-contact-info
            :model="newContact.full_name"
            input-name="full_name"
            label="full name"
            icon-name="person"
            placeholder="Full name"
            @modelValue="newContact.full_name = $event"
        />

        <new-contact-info
            :model="newContact.email"
            input-name="email"
            label="email"
            icon-name="email"
            placeholder="Email"
            @modelValue="newContact.email = $event"
        />

        <new-contact-info
            :model="newContact.numbers"
            input-name="numbers"
            label="numbers"
            icon-name="phone"
            placeholder="Number"
            :multipleInputs="true"
            @numbers="newContact.nmbers = $event"
        />

        <div class="new_contact__buttons_wrap">
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
import NewContactInfo from '@/components/NewContactInfo';

export default {
    name: 'NewContact',

    components: {
        NewContactInfo
    },

    data () {
        return {
            nextContactId: null,
            newContact: {
                id: null,
                user_avatar: '',
                full_name: '',
                email: '',
                numbers: {},
                isFavorite: false
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
                numbers: {},
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

        // set contact id
        // send data to store
        saveUser () {
            this.newContact.id = this.getContactListEntries + 1;
            this.addToContactList(this.newContact);
        }
    }
};
</script>
