<template>
    <div :class="`contact_entry__info contact_entry__info--${inputName}`">
        <p class="contact_entry__info_label">
            <span :class="`icon icon-${iconName}`"></span>
            {{ label }}
        </p>

        <div
            :key="inputsNumber"
            v-if="multipleInputs && showInputs">

            <template v-for="(input, index) in inputsNumber">
                <div
                    :key="input"
                    class="contact_entry__input_wrap contact_entry__input_wrap--numbers"
                >
                    <input
                        v-model="tempModel[index].number"
                        :id="`${inputName}_${input}`"
                        :placeholder="placeholder"
                        type="number"
                        class="contact_entry__input"
                        :class="{'has-value': tempModel[index].number}"
                        @blur="returnModelValue()"
                    />
                    <input
                        v-model="tempModel[index].label"
                        :id="`${inputName}_${input}_label`"
                        type="text"
                        placeholder="Label"
                        class="contact_entry__input is-short"
                        :class="{'has-value': tempModel[index].label}"
                        @blur="returnModelValue()"
                    />

                    <div
                        class="contact_entry__delete_wrap"
                        @click="decreaseInputNumber($event, index)"
                    >
                        <a role="button" class="contact_entry__delete_input">
                            <span class="icon icon-x"></span>
                        </a>
                    </div>
                </div>
            </template>

            <a
                role="button"
                class="contact_entry__add_input"
                @click="increaseInputNumber()"
            >
                <span class="icon icon-add"></span>
                <p>Add number</p>
            </a>

        </div>

        <template v-else>

            <div class="contact_entry__input_wrap">
                <input
                    v-model="tempModel"
                    :id="inputName"
                    :placeholder="placeholder"
                    :type="inputName === 'email' ? 'email' : 'text'"
                    class="contact_entry__input"
                    :class="[{'has-value': tempModel}, {'has-error': error}]"
                    required
                    @blur="returnModelValue()"
                />
                <span
                    v-if="error"
                    class="contact_entry__input_error"
                >
                    {{ error }}
                </span>
            </div>

        </template>

    </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'NewContactInfo',

    props: {
        model: [String, Array, Object],
        inputName: String,
        label: String,
        iconName: String,
        placeholder: String,
        multipleInputs: Boolean,
        error: String
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
        console.log(this.inputsNumber);

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

            console.log('evo me', this.inputName);
            const fieldName = `${this.inputName}_${uniqueId}`;
            const fieldLabel = `${this.inputName}_${uniqueId}_label`;
            const numberObject = {
                number: '',
                label: ''
            }

            this.tempModel.push({number: '', label: ''});

            this.inputsNumber = this.inputsNumber + 1;
            console.log(this.inputsNumber);
            this.showInputs = true;
        },

        // get element parent and position of item in array
        // remove the parent from the DOM
        // remove the item from the array
        decreaseInputNumber (e, uniqueId) {
            console.log('decreaseInputNumber');
            const element = e.target;
            // const position = this.inputsNumber.indexOf(uniqueId);

            element.parentElement.remove();

            this.inputsNumber = this.inputsNumber - 1;
            console.log(uniqueId);
            let poppedOut = this.tempModel.splice(uniqueId, 1);
            console.log('popped out', poppedOut);
        },

        returnModelValue () {
            this.$emit('modelValue', this.tempModel);
        }
    }
}
</script>