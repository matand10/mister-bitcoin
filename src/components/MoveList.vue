
<template>
    <section class="moves-container">
        <h1>Your last {{ user.moves.length }} Moves:</h1>
        <div class="move-container" v-for="(move, idx) in user.moves" :key="move._id">
            <h2>To: {{ move.to }}</h2>
            <h2>At: {{ move.at }}</h2>
            <h2>Amount: {{ move.amount }}</h2>
        </div>
    </section>
</template>


<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
.moves-container {
    background-color: rgb(196, 168, 219);
    margin-top: 25px;
    padding: 10px;
    border-radius: 4px;
}

.move-container {
    background-color: azure;
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 10px;
}
</style>
