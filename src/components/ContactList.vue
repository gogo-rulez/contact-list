<template>
    <ul class="contact__list">
        <contact
            id="1"
            img="http://lorempixel.com/output/people-q-c-80-80-8.jpg"
            name="Goran Savić"
            :isFavorite="false"
        />
        <contact
            id="2"
            img="http://lorempixel.com/output/people-q-c-80-80-9.jpg"
            name="Tihana Harapin Savić"
            :isFavorite="true"
        />
    </ul>
</template>

<script>
    import Contact from '@/components/Contact';
    export default {
        name: 'ContactList',
        components: {
            Contact
        }
    }
</script>