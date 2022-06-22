<template>
    <h1>Contact {{ contact?.id ? 'edit mode' : 'create mode' }}</h1>
    <form v-if="contact" @submit.prevent="save" class="contact-edit">
        <input v-model="contact.name" type="text" placeholder="Name..">
        <input v-model="contact.email" type="text" placeholder="Email..">
        <input v-model="contact.phone" type="text" placeholder="Phone number..">
        <button>Save</button>
        <button @click="back">Back</button>
    </form>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
export default {
    data() {
        return {
            contact: null,
        }
    },
    methods: {
        async save() {
            await this.$store.dispatch({ type: 'saveContact', contact: this.contact })
            this.$router.push('/contacts')
        },
        back() {
            this.$router.push('/contacts')
        }
    },
    async created() {
        const _id = this.$route.params._id
        if (_id) {
            this.contact = await contactService.get(_id)
        } else {
            this.contact = await contactService.getEmptyContact()
        }
    }
}
</script>

<style lang="scss">
.contact-edit {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;

    background-color: lightslategray;
    color: beige;
    padding: 10px;

    button {
        align-self: end;
    }
}
</style>