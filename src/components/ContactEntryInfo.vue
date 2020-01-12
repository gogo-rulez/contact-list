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
                        type="text"
                        class="contact_entry__input"
                        :class="[{'has-value': tempModel[index].number}, {'has-error': numberError(index, 'number')}]"
                        @blur="returnModelValue()"
                    />
                    <input
                        v-model="tempModel[index].label"
                        :id="`${inputName}_${input}_label`"
                        type="text"
                        placeholder="Label"
                        class="contact_entry__input is-short"
                        :class="[{'has-value': tempModel[index].label}, {'has-error': numberError(index, 'label')}]"
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
import {contactEntryInfoMixin} from '@/mixins/contactEntryInfoMixin'

export default {
    name: 'NewContactInfo',

    mixins: [contactEntryInfoMixin]
}
</script>