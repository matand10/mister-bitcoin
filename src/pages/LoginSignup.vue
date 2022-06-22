
<template>
    <div class="swtich-btn-container">
        <button @click="toggleSignup = !toggleSignup">{{ toggleSignup ? 'Login' : 'Sign-up' }}</button>
    </div>
    <section class="login-signup-container">
        <div v-if="toggleSignup" class="signup-container">
            <h1>Signup!</h1>
            <form @submit.prevent="onSignup">
                <input v-model="credential" type="text" placeholder="Your name?">
                <button>Signup</button>
            </form>
        </div>
        <div v-else class="login-container">
            <h1>Login!</h1>
            <form @submit.prevent="onLogin">
                <input v-model="credential" type="text" placeholder="Your name?">
                <button>Login</button>
            </form>
        </div>
        <div class="bike-img-container">
            <img src="../assets/img/bike.gif" alt="bike image">
        </div>
    </section>
</template>


<script>
import { userService } from '../services/user.service'
export default {
    data() {
        return {
            credential: '',
            toggleSignup: false
        }
    },
    methods: {
        async onSignup() {
            const newUser = userService.createUser(this.credential)
            await this.$store.dispatch({ type: 'signup', newUser })
            this.$router.push('/')
        },
        async onLogin() {
            await this.$store.dispatch({ type: 'login', credential: this.credential })
            this.$router.push('/')
        },
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },

    components: {

    }
}
</script>

<style lang="scss">
.login-signup-container {
    height: 250px;
    display: flex;
    gap: 25px;
    justify-content: center;
    align-items: center;

    & .signup-container {
        height: 150px;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 25px;
    }

    & .login-container {
        height: 150px;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 25px;
    }

}

.bike-img-container {
    width: 150px;
    height: 150px;

    & img {
        width: 100%;
        height: 100%;
    }
}
</style>
