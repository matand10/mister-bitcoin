<template>
    <section v-if="contact" class="contact-details-container">
        <h2>Name: {{ contact.name }}</h2>
        <h3>Email: {{ contact.email }}</h3>
        <h3>Phone number: {{ contact.phone }}</h3>
        <div>
            <RouterLink :to="`/contacts/edit/${contact._id}`">Edit</RouterLink>
            <button @click="back">Back</button>
        </div>
        <TransferFund @transfer-coins="transfer" :contact="contact" />
    </section>
</template>

<script>
import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'
import TransferFund from '../components/TransferFund.vue'


export default {
    data() {
        return {
            contact: null,
        }
    },
    async created() {
        const { _id } = this.$route.params
        this.contact = await contactService.get(_id)
    },
    methods: {
        back() {
            this.$router.push('/contacts')
        },
        async transfer(transferCoins) {
            const user = await userService.get(this.user._id)
            const updatedUser = userService.handleUserTrans(user, this.contact, transferCoins)
            await this.$store.dispatch({ type: 'saveUser', user: updatedUser })
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    components: {
        TransferFund
    }
}
</script>

<style scoped lang="scss">
.contact-details-container {
    background-color: lightslategray;
    border-radius: 4px;
    color: white;
    padding: 10px;
}
</style>