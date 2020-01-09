<template>
    <div class="search_bar">
        <div class="search_bar__headline">

            <div class="search_bar__options_wrap">
                <router-link
                    :to="{ name: 'Home' }"
                    :class="{'is-active': $route.name === 'Home'}"
                    class="search_bar__option"
                >
                    All contacts

                </router-link>
                <router-link
                    :to="{ name: 'Favorites' }"
                    class="search_bar__option"
                    :class="{'is-active': $route.name === 'Favorites'}"
                >
                    My favorites
                </router-link>
            </div>

        </div>

        <div class="search_bar__input_wrap">
            <input
                v-model="tempModel"
                type="text"
                class="search_bar__input"
                @keyup="updateSearchQuery()"
            >
            <a role="button" class="search_bar__input_submit">
                <span class="icon icon-search"></span>
            </a>
        </div>

    </div>
</template>


<script>
    export default {
        name: 'SearchBar',

        props: {
            model: String
        },

        data () {
            return {
                tempModel: null
            }
        },

        mounted () {
            this.tempModel = this.model;
        },

        methods: {
            updateSearchQuery () {
                this.$emit('searchInputValue', this.tempModel);
            }
        }
    }
</script>