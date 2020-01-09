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
import NewContactInfo from '@/components/NewContactInfo';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'NewContact',

    components: {
        NewContactInfo
    },

    data () {
        return {
            nextContactId: null,
            emptyNewContact: {
                id: null,
                user_avatar: '',
                full_name: '',
                email: '',
                numbers: {},
                isFavorite: false
            },
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

    mounted () {

        console.log('mounted');
        // this.newContact.id = this.getContactListEntries + 1;

        // if(localStorage.getItem('contact_list')) {
        //     let items = JSON.parse(localStorage.getItem('contact_list'));
        //     // this.nextContactId = this.getContactListEntries;
        // } else {
        //     // this.newContact.id = 1;
        //     this.nextContactId = 1;
        // }

    },

    computed: {
        ...mapGetters(['getContactList', 'getContactListEntries'])
    },

    watch: {
        getContactList () {
            Object.assign(this.newContact, this.emptyNewContact);
            this.previewImageSource = '';
            this.nextContactId = this.getContactListEntries + 1;
        }
    },

    methods: {
        ...mapActions(['saveContactList']),

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

        // store previous contacts in array
        // store new contact in array
        // stringify the array so that localStorage can receive it
        // reload component by changing nextContactId
        // reset the data and the previewImageSource
        saveUser () {
            let prevStorage = [];

            console.log('goran 4', this.getContactListEntries);
            this.newContact.id = this.getContactListEntries + 1;
            console.log('GORAN 5', this.newContact.id);

            // if(localStorage.getItem('contact_list')) {
            //     let items = JSON.parse(localStorage.getItem('contact_list'));
            //     console.log('ITEMS', items);
            //     items.forEach(item => {
            //         prevStorage.push(item);
            //     });
            // }

            console.log('list length', this.getContactList.length);
            prevStorage.push(this.newContact);
            this.saveContactList(this.newContact);


            console.log('GORAN 3', this.getContactList);
            // this.newContact.id = this.nextContactId;
        }
    }
};
</script>
