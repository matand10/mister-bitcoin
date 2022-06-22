<template>
    <section v-if="contact" class="transfer-component">
        <div class="transfer-header">
            <h1>Transfer coins to {{ contact.name }}:</h1>
        </div>
        <div class="transfer-footer">
            <form @submit.prevent="onTransfer" class="transfer-form">
                <input v-model="transferCoins" type="number">
                <button>Transfer</button>
            </form>
        </div>
    </section>
</template>


<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            transferCoins: 0,
        }
    },
    methods: {
        onTransfer() {
            this.$emit('transfer-coins', this.transferCoins)
            this.transferCoins = 0
        }
    },
}
</script>

<style scoped lang="scss">
.transfer-component {
    background-color: rgb(112, 154, 231);
    margin-top: 25px;
    padding: 10px;
    border-radius: 4px;
}

.transfer-header {
    margin-bottom: 30px;
}

.transfer-form {
    display: flex;
    gap: 10px;
}
</style>