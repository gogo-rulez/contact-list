import { mapGetters } from 'vuex';

export const contactEntryInfoMixin = {
    props: {
        model: [String, Array, Object],
        inputName: String,
        label: String,
        iconName: String,
        placeholder: String,
        multipleInputs: Boolean,
        error: [String, Array]
    },

    data () {
        return {
            tempModel: null,
            inputsNumber: this.model.length ? this.model.length : 0,
            showInputs: false
        }
    },

    computed: {
        ...mapGetters(['getContactListEntries'])
    },

    mounted () {
        this.tempModel = this.model;

        // stop here if the multipleInput prop is false
        if (!this.multipleInputs) return;

        if(!this.inputsNumber) {
            this.increaseInputNumber();
        } else {
            this.showInputs = true;
        }
    },

    methods: {

        // check if the field has a value
        // and add a class that will style the text
        checkValue(e) {
            const element = e.target;

            if(element.value) {
                element.classList.add('has-value');
            } else {
                element.classList.remove('has-value');

            }
        },

        // push a unique id to the items array
        // show the items
        increaseInputNumber () {
            const uniqueId = this.getContactListEntries + 1;

            const fieldName = `${this.inputName}_${uniqueId}`;
            const fieldLabel = `${this.inputName}_${uniqueId}_label`;
            const numberObject = {
                number: '',
                label: ''
            }

            this.tempModel.push({number: '', label: ''});

            this.inputsNumber = this.inputsNumber + 1;
            this.showInputs = true;
        },

        // get element parent and position of item in array
        // remove the parent from the DOM
        // remove the item from the array
        decreaseInputNumber (e, uniqueId) {

            const element = e.target;
            const parent = element.parentElement;
            parent.parentElement.removeChild(parent);

            this.inputsNumber = this.inputsNumber - 1;
            let poppedOut = this.tempModel.splice(uniqueId, 1);
        },

        returnModelValue () {
            this.$emit('modelValue', this.tempModel);
        },

        numberError(index, part) {

            if(!this.error.length || !this.error[index]) return false;

            return this.error[index].error === part;
        }
    }
}