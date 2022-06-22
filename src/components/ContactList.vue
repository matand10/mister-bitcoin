<template>
    <section class="contact-list" v-if="contacts">
        <TransitionGroup name="list">
            <article v-for="(contact, idx) in contacts" :key="contact._id" class="contact-preview-container">
                <div class="contact-img">
                    <img v-bind:src="`https://robohash.org/${idx}.png`">
                </div>
                <ContactPreview :contact="contact" />
                <section class="actions">
                    <RouterLink :to="`/contacts/${contact._id}`">Details</RouterLink>
                    <RouterLink :to="`/contacts/edit/${contact._id}`">Edit</RouterLink>
                    <button @click="removeContact(contact._id)">x</button>
                </section>
            </article>
        </TransitionGroup>
    </section>
    <section v-else>Loading...</section>
</template>

<script>
import ContactPreview from '@/components/ContactPreview.vue'

export default {
    props: {
        contacts: {
            type: Array,
        }
    },
    methods: {
        removeContact(contactId) {
            this.$emit('remove-contact', contactId)
        },
    },
    components: {
        ContactPreview
    }
}
</script>

<style lang="scss">
.contact-list {
    background-color: lightgray;
    padding: 10px;
}

.contact-img {
    width: 60px;
    border-radius: 50%;
    border: 1px solid whitesmoke;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
}


.contact-preview-container {
    background-color: darkcyan;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;

    a {
        margin-inline-end: 6px;
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.2rem;
    }
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(50%);
}
</style>