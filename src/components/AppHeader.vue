<template>
    <header class="app-header">
        <h1>Mr.Bitcoin</h1>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/contacts">Contacts</RouterLink>
            <RouterLink to="/charts">Charts</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
    </header>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5vh;

    background-color: lightblue;
    padding: 10px;
}
</style>