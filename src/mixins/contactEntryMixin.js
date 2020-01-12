import { mapGetters, mapActions } from 'vuex';

export const contactEntryMixin = {

    computed: {
        ...mapGetters(['getContactList', 'getContactListEntries'])
    },

    methods: {

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

        validateInput () {
            // validate full_name field
            if(!this.newContact.full_name) {
                this.errors.full_name = 'This field is required.'
            } else if(!this.validFullName(this.newContact.full_name)) {
                this.errors.full_name = 'Enter Your first and last name.'
            } else {
                this.errors.full_name = '';
            }

            // validate email field
            if(!this.newContact.email) {
                this.errors.email = 'This field is required.'
            } else if(!this.validEmail(this.newContact.email)) {
                this.errors.email = 'Enter a valid e-mail.'
            } else {
                this.errors.email = '';
            }

            // validate each number field
            // if number is entered and label is not, set an error for the label
            // if label is entered and number is not, set an error for the number
            // else remove error entries for that number
            this.newContact.numbers.forEach((number, index) => {

                this.errors.numbers.push();

                if(number.number && !number.label) {

                    this.errors.numbers[index] = {
                        index: index,
                        error: 'label'
                    }
                } else if(number.label && !number.number) {

                    this.errors.numbers[index] = {
                        index: index,
                        error: 'number'
                    }
                } else {
                    const position = this.errors.numbers.find(x => x.index = index);
                    this.errors.numbers.splice(position, 1);
                }

            });

            if(this.errors.full_name || this.errors.email || this.errors.numbers.length) return false;

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

}