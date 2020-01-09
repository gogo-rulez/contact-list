<template>
    <div :class="`new_contact__info new_contact__info--${inputName}`">
        <p class="new_contact__info_label">
            <span :class="`icon icon-${iconName}`"></span>
            {{ label }}
        </p>

        <template v-if="multipleInputs && showInputs">

            <template v-for="input in inputsNumber">
                <div
                    :key="input"
                    class="new_contact__input_wrap"
                >
                    <input
                        v-model="tempModel[input][`${inputName}_${input}`]"
                        :id="`${inputName}_${input}`"
                        :placeholder="placeholder"
                        type="text"
                        class="new_contact__info_input"
                        @keyup="checkValue($event)"
                        @blur="returnModelValue()"
                    />
                    <input
                        v-model="tempModel[input][`${inputName}_${input}_label`]"
                        :id="`${inputName}_${input}_label`"
                        type="text"
                        placeholder="Label"
                        class="new_contact__info_input is-short"
                        @keyup="checkValue($event)"
                        @blur="returnModelValue()"
                    />

                    <div
                        class="new_contact__delete_wrap"
                        @click="decreaseInputNumber($event, input)"
                    >
                        <a role="button" class="new_contact__delete_input">
                            <span class="icon icon-x"></span>
                        </a>
                    </div>
                </div>
            </template>

            <a
                role="button"
                class="new_contact__add_input"
                @click="increaseInputNumber()"
            >
                <span class="icon icon-add"></span>
                <p>Add number</p>
            </a>

        </template>

        <template v-else>

            <div class="new_contact__input_wrap">
                <input
                    v-model="tempModel"
                    :id="inputName"
                    :placeholder="placeholder"
                    type="text"
                    class="new_contact__info_input"
                    @keyup="checkValue($event)"
                    @blur="returnModelValue()"
                />
            </div>

        </template>

    </div>

</template>

<script>
    export default {
        name: 'NewContactInfo',

        props: {
            model: [String, Array, Object],
            inputName: String,
            label: String,
            iconName: String,
            placeholder: String,
            multipleInputs: Boolean
        },

        data () {
            return {
                tempModel: null,
                inputsNumber: [],
                showInputs: false
            }
        },

        mounted () {
            this.tempModel = this.model;

            if(this.multipleInputs) {
                this.increaseInputNumber();
            }
        },

        methods: {

            // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
            makeid() {
                let result           = '';
                let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;

                for ( let i = 0; i < 10; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                return result;
            },

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
                const uniqueId = this.makeid();

                console.log('evo me', this.inputName);
                const fieldName = `${this.inputName}_${uniqueId}`;
                const fieldLabel = `${this.inputName}_${uniqueId}_label`;
                const numberObject = {
                    [fieldName]: '',
                    [fieldLabel]: ''
                }

                this.tempModel[uniqueId] = numberObject;

                this.inputsNumber.push(uniqueId);
                this.showInputs = true;
            },

            // get element parent and position of item in array
            // remove the parent from the DOM
            // remove the item from the array
            decreaseInputNumber (e, uniqueId) {
                const element = e.target;
                const position = this.inputsNumber.indexOf(uniqueId);

                element.parentElement.remove();

                this.inputsNumber.splice(position, 1);
                delete this.tempModel[uniqueId];
            },

            returnModelValue () {
                console.log(this.tempModel);
                this.$emit('modelValue', this.tempModel);
            }
        }
    }
</script>