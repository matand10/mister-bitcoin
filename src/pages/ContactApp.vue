<template>
    <div class="contacts-header">
        <h1>Contacts:</h1>
        <RouterLink :to="'/contacts/edit'">Add</RouterLink>
    </div>
    <ContactFilter @onFilter="filter" />
    <ContactList @remove-contact="removeContact" :contacts="contactsToShow" />
</template>

<script>
import ContactList from '@/components/ContactList.vue'
import ContactFilter from '@/components/ContactFilter.vue'


export default {
    data() {
        return {
            filterBy: { txt: '' }
        }
    },

    async created() {
        this.$store.dispatch({ type: 'loadContacts' })
    },
    computed: {
        contactsToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.contacts.filter(contact => regex.test(contact.name) || regex.test(contact.phone))
        },
        contacts() {
            return this.$store.getters.contacts
        }
    },

    methods: {
        filter(filterBy) {
            this.filterBy = { ...filterBy }
        },
        async removeContact(contactId) {
            await this.$store.dispatch({ type: 'removeContact', contactId })
        }
    },
    watch: {
        filterBy(newVal, oldVal) {
            // console.log('newVal from watch', newVal)
        }
    },


    components: {
        ContactList,
        ContactFilter,
    }
}
</script>

<style lang="scss">
.contacts-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}
</style>