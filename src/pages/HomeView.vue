<template>
    <main v-if="user">
        <h1>Hello {{ user.name }}!</h1>
        <h1>Your current coins: {{ user.coins }}!</h1>
        <h1>The current bitcoin price is: ${{ (bitcoin?.values[bitcoin.values.length - 1].price)?.toLocaleString() }}
        </h1>
        <button @click="onLogout">Logout</button>
        <MoveList :user="user" />
    </main>
    <div v-else>Loading...</div>
</template>


<script>
import { bitcoinService } from '../services/bitcoin.service'
import MoveList from '../components/MoveList.vue'

export default {
    data() {
        return {
            bitcoin: null
        }
    },
    async created() {
        this.$store.dispatch({ type: 'loadUser' })
    },
    methods: {
        async onLogout() {
            await this.$store.dispatch({ type: 'logout', user: null })
        }
    },
    computed: {
        user() {
            const user = this.$store.getters.user
            if (user) return this.$store.getters.user
            else this.$router.push('/login')
        }
    },
    components: {
        MoveList,
    }
}
</script>

<style scoped>
</style>
